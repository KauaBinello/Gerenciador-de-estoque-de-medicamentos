import { Pool } from "pg"
import { Database } from "./Database"
import { Cliente } from "../entity/Cliente"

export class ClienteRepository {

    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()
    }

    async listarClientes(): Promise<Cliente[]> {

        const query = "SELECT * FROM pi.clientes"
        const result = await this.pool.query(query)

        const listaClientes: Cliente[] = []

        for (const row of result.rows) {
            const cliente = new Cliente(row.id, row.nome, row.cpf, row.endereco, row.numero_residencial, row.bairro, row.cidade, row.uf, row.telefone, row.nascimento)
            listaClientes.push(cliente)
        }
        return listaClientes
    }

    async exibirID(nome: string): Promise<number[]> {
        const query = 'SELECT id FROM pi.clientes WHERE nome ilike $1'
        const id = await this.pool.query(query, [nome])

        const lista: number[] = []
        for (const row of id.rows) {
            lista.push(row.id)
        }
        return lista
    }

    async buscaPorID(id: number): Promise<Cliente[]> {
        let query = 'SELECT * FROM pi.clientes WHERE id = $1'
        const busca = await this.pool.query(query, [id])

        const lista: Cliente[] = []
        for (const row of busca.rows) {
            const cliente = new Cliente(row.id, row.nome, row.cpf, row.endereco, row.numero_residencial, row.bairro, row.cidade, row.uf, row.telefone, row.nascimento)
            lista.push(cliente)
        }
        return lista
    }

    async inserirCliente(nome: string, cpf: string, endereco: string, numero_residencial: string, bairro: string, cidade: string, uf: string, telefone: string, nascimento: Date) {
        let query = 'INSERT INTO pi.clientes (nome, cpf, endereco, numero_residencial, bairro, cidade, uf, telefone, nascimento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
        await this.pool.query(query, [nome, cpf, endereco, numero_residencial, bairro, cidade, uf, telefone, nascimento])
    }
}
