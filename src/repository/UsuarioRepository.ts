import { Pool } from "pg"
import { Database } from "./Database"
import { Usuario } from "../entity/Usuario"
import { log } from "console"

export class UsuarioRepository {

    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()
    }

    public async listarUsuarios(): Promise<Usuario[]> {

        const query = "SELECT * FROM pi.usuarios ORDER BY id ASC"
        const result = await this.pool.query(query)

        const listaUsuarios: Usuario[] = []

        for (const row of result.rows) {
            const usuario = new Usuario(row.id, row.nome, row.email, row.login, row.senha)
            listaUsuarios.push(usuario)
        }
        return listaUsuarios
    }

    public async verificaRetorno(login) {
        let query = 'SELECT * FROM pi.usuarios WHERE login = $1'
        const busca = await this.pool.query(query, [login])

            const lista: Usuario[] = []
        for (const row of busca.rows) {
            const usuario = new Usuario(row.id, row.nome, row.email, row.login, row.senha)
            lista.push(usuario)
        }
        return lista
    }

    public async inserirUsuario(nome: string, email: string, login: string, senha: string) {
        let query = 'INSERT INTO pi.usuarios (nome, email, login, senha) VALUES ($1, $2, $3, $4)'
        await this.pool.query(query, [nome, email, login, senha])
    }

    public async exibirID(login: string): Promise<number[]> {
        const query = 'SELECT id FROM pi.usuarios WHERE login ilike $1'
        const id = await this.pool.query(query, [login])

        let lista: number[] = []
        for (const row of id.rows) {
            lista.push(row.id)
        }
        return lista
    }

    public async buscarInformacoes(login: string): Promise<Usuario[]> {
        let query = 'SELECT * FROM pi.usuarios WHERE login = $1'
        const busca = await this.pool.query(query, [login])

        const lista: Usuario[] = []
        for (const row of busca.rows) {
            const usuario = new Usuario(row.id, row.nome, row.email, row.login, row.senha)
            lista.push(usuario)
        }
        return lista
    }

    public async atualizarUsuario(login: string, coluna: string, registro: string): Promise<void> {
        const query = `UPDATE pi.usuarios SET ${coluna} = $1 WHERE login = $2`
        const result = await this.pool.query(query, [registro, login])
    }

    public async deletarUsuario(login: string) {
        let query = 'DELETE FROM pi.usuarios WHERE login = $1'
        const result = await this.pool.query(query, [login])
        return result
    }

}