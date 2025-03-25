import { Cliente } from "../entity/Cliente"

export interface ICliente {

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

    listarClientes(): Promise<Cliente[]>;

    verificaCpf(cpf): Promise<Boolean | void | string>

    inserirCliente(nome: string, cpf: string, endereco: string, numero_residencial: string, bairro: string, cidade: string, uf: string, telefone: string, nascimento: Date);

    exibirID(cpf: string): Promise<number[]>

    buscarInformacoes(cpf: string)

    atualizarCliente(cpf: string, coluna: string, registro: string): Promise<string | void>

    deletarCliente(cpf: string): Promise<void>
}