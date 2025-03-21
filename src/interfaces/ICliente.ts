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

    verificaCpf(cpf): Promise<Boolean>

    inserirCliente(nome: string, cpf: string, endereco: string, numero_residencial: string, bairro: string, cidade: string, uf: string, telefone: string, nascimento: Date);

    exibirID(cpf: string): Promise<number[]>

    buscarInformacoes(id: number): Promise<Cliente[]>

    atualizarCliente(id: number, coluna: string, registro: string): Promise<void>

    deletarCliente(id: number): Promise<void>
}