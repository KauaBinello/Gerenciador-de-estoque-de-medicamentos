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

    public async inserirMedicamento(nome: string, embalagem: string, saldo: number, validade: Date) {
        await this.repo.inserirMedicamento(nome, embalagem, saldo, validade)
    }

    public async exibirID(nome: string): Promise<number[]> {
        return await this.repo.exibirID(nome)
    }

    public async buscarInformacoes(id: number): Promise<Medicamento[]> {
        return await this.repo.buscarInformacoes(id)
    }

    public async atualizarMedicamento(id: number, coluna: string, registro: string): Promise<void> {
        await this.repo.atualizarMedicamento(id, coluna, registro)
    }

    public async deletarMedicamento(id: number) {
        await this.repo.deletarMedicamento(id)
    }
}