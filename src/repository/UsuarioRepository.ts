import { Pool } from "pg"
import { Database } from "./Database"
import { Usuario } from "../entity/Usuario"

export class UsuarioRepository {

    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()
    }

    public async listarUsuarios(): Promise<Usuario[]> {

        const query = "SELECT * FROM pi.usuarios"
        const result = await this.pool.query(query)

        const listaUsuarios: Usuario[] = []

        for (const row of result.rows) {
            const usuario = new Usuario(row.id, row.nome, row.email, row.login, row.senha)
            listaUsuarios.push(usuario)
        }
        return listaUsuarios
    }

    public async inserirUsuario(nome: string, email: string, login: string, senha: string) {
        let query = 'INSERT INTO pi.usuarios (nome, email, login, senha) VALUES ($1, $2, $3, $4)'
        await this.pool.query(query, [nome, email, login, senha])
    }

    public async exibirID(nome: string): Promise<number[]> {
        const query = 'SELECT id FROM pi.usuarios WHERE nome ilike $1'
        const id = await this.pool.query(query, [nome])

        let lista: number[] = []
        for (const row of id.rows) {
            lista.push(row.id)
        }
        return lista
    }

    public async buscarInformacoes(id: number): Promise<Usuario[]> {
        let query = 'SELECT * FROM pi.usuarios WHERE id = $1'
        const busca = await this.pool.query(query, [id])

        const lista: Usuario[] = []
        for (const row of busca.rows) {
            const usuario = new Usuario(row.id, row.nome, row.email, row.login, row.senha)
            lista.push(usuario)
        }
        return lista
    }

    public async atualizarUsuario(id: number, coluna: string, registro: string): Promise<void> {
        const query = `UPDATE pi.usuarios SET ${coluna} = $1 WHERE id = $2`
        const result = await this.pool.query(query, [registro, id])
    }

    public async deletarUsuario(id: number) {
        let query = 'DELETE FROM pi.usuarios WHERE id = $1'
        const result = await this.pool.query(query, [id])
        return result
    }

}