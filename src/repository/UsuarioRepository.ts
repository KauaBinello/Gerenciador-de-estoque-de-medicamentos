import { Pool } from "pg"
import { Database } from "./DataBaseRepository"
import { Usuario } from "../entity/Usuario"

export class UsuarioRepository {

    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()
    }

    async listarUsuarios(): Promise<Usuario[]> {

        const query = "SELECT * FROM pi.usuarios"
        const result = await this.pool.query(query)

        const listaUsuarios: Usuario[] = []

        for (const row of result.rows) {
            const usuario = new Usuario(row.id, row.nome, row.email, row.login, row.senha)
            listaUsuarios.push(usuario)
        }
        return listaUsuarios
    }

    async inserirUsuario(nome: string, email: string, login: string, senha: string) {
        let query = 'INSERT INTO pi.usuarios (nome, email, login, senha) VALUES ($1, $2, $3, $4)'
        await this.pool.query(query, [nome, email, login, senha])
    }
}