import { Cliente } from "../entity/Cliente";
import { ClienteRepository } from "../repository/ClienteRepository";

export class ClienteService {
    private repo: ClienteRepository

    constructor() {
        this.repo = new ClienteRepository
    }

    public async listarClientes(): Promise<Cliente[]> {
        return await this.repo.listarClientes()
    }

    public async exibirID(nome: string): Promise<number[]> {
        return await this.repo.exibirID(nome)
    }

    public async buscaPorID(id:number): Promise<Cliente[]>{
        return await this.repo.buscaPorID(id)
    }

    public async inserirCliente(nome: string, cpf: string, endereco: string, numero_residencial: string, bairro: string, cidade: string, uf: string, telefone: string, nascimento: Date) {
    await this.repo.inserirCliente(nome, cpf, endereco, numero_residencial, bairro, cidade, uf, telefone, nascimento)
    }
}

