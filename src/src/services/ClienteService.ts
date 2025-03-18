import { Cliente } from "../entity/Cliente";
import { ICliente } from "../interfaces/ICliente";
import { ClienteRepository } from "../repository/ClienteRepository";

export class ClienteService implements ICliente {
    private repo: ClienteRepository
    id: number
    nome: string
    cpf: string
    endereco: string
    numero_residencial: string
    bairro: string
    cidade: string
    uf: string
    telefone: string
    nascimento: Date

    constructor() {
        this.repo = new ClienteRepository
    }

    public async listarClientes(): Promise<Cliente[]> {
        return await this.repo.listarClientes()
    }

    public async inserirCliente(nome: string, cpf: string, endereco: string, numero_residencial: string, bairro: string, cidade: string, uf: string, telefone: string, nascimento: Date) {
        if (nome.length < 3) {
            console.log('Nome inválido! Deve ter pelo menos 3 caracteres. ')
            return
        }
        if (!/^\d{11}$/.test(cpf)) {
            console.log('CPF inválido! Deve conter exatamente 11 dígitos numéricos. ')
            return
        }
        if (endereco.length < 3) {
            console.log('Endereço inválido! Deve conter pelo menos 3 caracteres. ')
            return
        }
        if (!numero_residencial) {
            console.log('Endereço inválido. ')
            return
        }
        if (bairro.length < 3) {
            console.log('Bairro inválido! Deve conter pelo menos 3 caracteres! ')
            return
        }
        if (cidade.length < 3) {
            console.log('Cidade inválida! Deve conter pelo menos 3 caracteres! ')
            return
        }
        if (uf.length !== 2) {
            console.log('UF inválida! Deve conter 2 caracteres! ')
            return
        }
        if (!/^\d{10,11}$/.test(telefone)) {
            console.log('Telefone inválido! Deve conter 10 ou 11 dígitos numéricos. ')
            return
        }
        if (!nascimento) {
            console.log('Data inválida! ')
            return
        }
        await this.repo.inserirCliente(nome, cpf, endereco, numero_residencial, bairro, cidade, uf, telefone, nascimento)
        console.log('Cliente inserido com sucesso! ')
    }

    public async exibirID(nome: string): Promise<number[]> {
        return await this.repo.exibirID(nome)
    }

    public async buscarInformacoes(id: number): Promise<Cliente[]> {
        return await this.repo.buscarInformacoes(id)
    }

    public async atualizarCliente(id: number, coluna: string, registro: string): Promise<void> {
        await this.repo.atualizarCliente(id, coluna, registro)
    }

    public async deletarCliente(id: number): Promise<void> {
        await this.repo.deletarCliente(id)
    }
}

