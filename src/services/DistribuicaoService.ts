import { Distribuicao } from "../entity/Distribuicao";
import { DistribuicaoRepository } from "../repository/DistribuicaoRepository";

export class DistribuicaoService {

    private repo: DistribuicaoRepository

    constructor() {
        this.repo = new DistribuicaoRepository()
    }

    async listarDistribuicoes(): Promise<Distribuicao[]> {
        return await this.repo.listarDistribuicoes()
    }

    public async distribuirMedicamento(medicamento_id: number, quantidade: number, saida: Date, usuario_id: number, cliente_id: number) {
        await this.repo.distribuirMedicamento(medicamento_id, quantidade, saida, usuario_id, cliente_id);
    }
}