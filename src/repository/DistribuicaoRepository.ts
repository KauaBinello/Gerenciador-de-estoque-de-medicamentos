import { Pool } from "pg"
import { Distribuicao } from "../entity/Distribuicao"
import { Database } from "./Database"

export class DistribuicaoRepository {

    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()
    }

    async listarDistribuicoes(): Promise<Distribuicao[]> {

        const query = "SELECT * FROM pi.distribuicoes"
        const result = await this.pool.query(query)

        const listaDistribuicao: Distribuicao[] = []

        for (const row of result.rows) {
            const distribuicao = new Distribuicao(row.serial, row.medicamento_id, row.quantidade, row.saida, row.usuario_id, row.cliente_id)
            listaDistribuicao.push(distribuicao)
        }
        return listaDistribuicao
    }
}