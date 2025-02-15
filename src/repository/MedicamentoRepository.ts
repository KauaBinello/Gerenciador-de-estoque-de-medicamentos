import { Pool } from "pg"
import { Medicamento } from "../entity/Medicamento.ts"
import { Database } from "./DataBaseRepository.ts"

export class MedicamentoRepository {

    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()
    }

    async listarMedicamentos(): Promise<Medicamento[]> {

        const query = 'SELECT * FROM pi.medicamentos'
        const result = await this.pool.query(query)

        const listaMedicamento: Medicamento[] = []

        for (const row of result.rows) {
            const medicamento = new Medicamento(row.id, row.nome, row.embalagem, row.saldo, row.embalagem)
            listaMedicamento.push(medicamento)
        }
        return listaMedicamento
    }
}

