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
    
        const ufValida = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]

        if (!nome.trim) {
            console.log('O nome não pode ser deixado vazio. ')
            return
        }
        if (!/^\d{11}$/.test(cpf)) {
            console.log('CPF inválido! Deve conter exatamente 11 dígitos numéricos. ')
            return
        }
        if (!endereco.trim()) {
            console.log('O endereço é um campo obrigatório. ')
            return
        }
        if (!numero_residencial.trim()) {
            console.log('O número residencial não pode ser deixado vazio. ')
            return
        }
        if (!bairro.trim()) {
            console.log('O bairro é um campo obrigatório.')
            return
        }
        if (!cidade.trim()) {
            console.log('A cidade inválida! Deve conter pelo menos 3 caracteres! ')
            return
        }
        if (uf.length !== 2 || !ufValida.includes(uf)) {
            console.log("A sigla do estado (UF) deve ser válida e conter 2 caracteres.");
            return;
        }
        if (!/^\d{10,11}$/.test(telefone)) {
            console.log('O telefone deve conter 10 ou 11 dígitos numéricos. ')
            return
        }
        if (!nascimento) {
            console.log('A data de nascimento é inválida. ')
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

