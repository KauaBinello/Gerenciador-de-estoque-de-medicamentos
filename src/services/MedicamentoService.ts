import { Medicamento } from "../entity/Medicamento";
import { MedicamentoRepository } from "../repository/MedicamentoRepository";

export class MedicamentoService {
    private repo: MedicamentoRepository

    constructor() {
        this.repo = new MedicamentoRepository
    }

    async listarMedicamentos(): Promise<Medicamento[]> {
        return await this.repo.listarMedicamentos()
    }
}