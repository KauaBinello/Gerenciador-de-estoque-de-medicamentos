import { Distribuicao } from "../entity/Distribuicao";
import { DistribuicaoRepository } from "../repository/DistrbuicaoRepository";

export class DistribuicaoService {

    private repo: DistribuicaoRepository

    constructor() {
        this.repo = new DistribuicaoRepository
    }

    async listarDistribuicoes(): Promise<Distribuicao[]> {
        return await this.repo.listarDistribuicoes()
    }
}