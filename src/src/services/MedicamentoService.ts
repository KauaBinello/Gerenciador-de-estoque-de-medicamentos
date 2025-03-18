import { Medicamento } from "../entity/Medicamento";
import { IMedicamento } from "../interfaces/IMedicamento";
import { MedicamentoRepository } from "../repository/MedicamentoRepository";

export class MedicamentoService  implements IMedicamento{

    private repo: MedicamentoRepository
    id: number
    nome: string
    embalagem: string
    saldo: number
    validade: Date

    constructor() {
        this.repo = new MedicamentoRepository

    }

    public async listarMedicamentos(): Promise<Medicamento[]> {
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

    public async deletarMedicamento(id: number): Promise<void> {
        await this.repo.deletarMedicamento(id)
    }
}