import { Distribuicao } from "../entity/Distribuicao";
import { IDistribuicao } from "../interfaces/IDistribuicao";
import { DistribuicaoRepository } from "../repository/DistribuicaoRepository";

export class DistribuicaoService implements IDistribuicao{

    private repo: DistribuicaoRepository
    serial: number
    medicamento_id: number
    quantidade: number
    saida: Date
    usuario_id: number
    cliente_id: number

    constructor() {
        this.repo = new DistribuicaoRepository()
    }

    async listarDistribuicoes(): Promise<Distribuicao[]> {
        return await this.repo.listarDistribuicoes()
    }

    public async distribuirMedicamento(medicamento_id: number, quantidade: number, saida: Date, usuario_id: number, cliente_id: number) {
        if (!quantidade){
            console.log('Informe a quantidade. ')
            return
        }
        await this.repo.distribuirMedicamento(medicamento_id, quantidade, saida, usuario_id, cliente_id);
    }

    public async buscarDistribuicao(id: number): Promise<Distribuicao[]> {
        return await this.repo.buscarDistribuicao(id)
    }

    public async buscarPorCliente(id: number): Promise<Distribuicao[]> {
        return await this.repo.buscarPorCliente(id)
    }

    public async buscarPorUsuario(id: number): Promise<Distribuicao[]> {
        return await this.repo.buscarPorUsuario(id)
    }

    public async buscarPorMedicamento(id: number): Promise<Distribuicao[]> {
        return await this.repo.buscarPorMedicamento(id)
    }

    public async buscarPorData(data1: Date, data2: Date): Promise<Distribuicao[]> {
        return await this.repo.buscarPorData(data1, data2)
    }
}