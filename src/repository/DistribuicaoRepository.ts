import { Pool } from "pg"
import { Distribuicao } from "../entity/Distribuicao"
import { Database } from "./Database"

export class DistribuicaoRepository {

    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()
    }

    public async listarDistribuicoes(): Promise<Distribuicao[]> {

        const query = "SELECT * FROM pi.distribuicoes"
        const result = await this.pool.query(query)

        const listaDistribuicao: Distribuicao[] = []

        for (const row of result.rows) {
            const distribuicao = new Distribuicao(row.serial, row.medicamento_id, row.quantidade, row.saida, row.usuario_id, row.cliente_id)
            listaDistribuicao.push(distribuicao)
        }
        return listaDistribuicao
    }

    public async distribuirMedicamento(medicamento_id: number, quantidade: number, saida: Date, usuario_id: number, cliente_id: number): Promise<void> {
        const query = `INSERT INTO pi.distribuicoes (medicamento_id, quantidade, saida, usuario_id, cliente_id) VALUES ($1, $2, $3, $4, $5)`;
        const query2 = 'UPDATE pi.medicamentos SET saldo = saldo - $1 WHERE id = $2';

        await this.pool.query(query, [medicamento_id, quantidade, saida, usuario_id, cliente_id]);
        await this.pool.query(query2, [quantidade, medicamento_id]);
    }

    public async buscarDistribuicao(id: number): Promise<Distribuicao[]> {
        const query = 'SELECT * FROM pi.distribuicoes WHERE serial = $1'
        const busca = await this.pool.query(query, [id])

        let lista: Distribuicao[] = []
        for (const row of busca.rows) {
            const distribuicao = new Distribuicao(row.serial, row.medicamento_id, row.quantidade, row.saida, row.usuario_id, row.cliente_id)
            lista.push(distribuicao)
        }
        return lista
    }

    public async buscarPorCliente(id: number): Promise<Distribuicao[]> {
        const query = 'SELECT d.serial, d.medicamento_id, d.quantidade, d.saida, d.usuario_id, d.cliente_id FROM pi.distribuicoes d JOIN pi.clientes c ON c.id = d.cliente_id WHERE c.id = $1'
        const busca = await this.pool.query(query, [id])

        let lista: Distribuicao[] = []
        for (const row of busca.rows) {
            const distribuicao = new Distribuicao(row.serial, row.medicamento_id, row.quantidade, row.saida, row.usuario_id, row.cliente_id)
            lista.push(distribuicao)
        }
        return lista
    }


    public async buscarPorUsuario(id: number): Promise<Distribuicao[]> {
        const query = 'SELECT d.serial, d.medicamento_id, d.quantidade, d.saida, d.usuario_id, d.cliente_id FROM pi.distribuicoes d JOIN pi.usuario u ON u.id = d.usuario_id WHERE u.id = $1'
        const busca = await this.pool.query(query, [id])

        let lista: Distribuicao[] = []
        for (const row of busca.rows) {
            const distribuicao = new Distribuicao(row.serial, row.medicamento_id, row.quantidade, row.saida, row.usuario_id, row.cliente_id)
            lista.push(distribuicao)
        }
        return lista
    }

    public async buscarPorMedicamento(id: number): Promise<Distribuicao[]> {
        const query = 'SELECT d.serial, d.medicamento_id, d.quantidade, d.saida, d.usuario_id, d.cliente_id FROM pi.distribuicoes d JOIN pi.medicamentos m ON m.id = d.medicamento_id WHERE m.id = $1'
        const busca = await this.pool.query(query, [id])

        let lista: Distribuicao[] = []
        for (const row of busca.rows) {
            const distribuicao = new Distribuicao(row.serial, row.medicamento_id, row.quantidade, row.saida, row.usuario_id, row.cliente_id)
            lista.push(distribuicao)
        }
        return lista
    }

    public async buscarPorData(data1: Date, data2: Date): Promise<Distribuicao[]> {
        const query = 'SELECT d.serial, d.medicamento_id, d.quantidade, d.saida, d.usuario_id, d.cliente_id FROM pi.distribuicoes d JOIN pi.medicamentos m ON m.id = d.medicamento_id WHERE d.saida BETWEEN $1 AND $2 ORDER BY d.saida'
        const busca = await this.pool.query(query, [data1, data2])

        let lista: Distribuicao[] = []
        for (const row of busca.rows) {
            const distribuicao = new Distribuicao(row.serial, row.medicamento_id, row.quantidade, row.saida, row.usuario_id, row.cliente_id)
            lista.push(distribuicao)
        }
        return lista
    }
}

