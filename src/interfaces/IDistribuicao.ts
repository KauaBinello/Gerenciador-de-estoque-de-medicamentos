import { Distribuicao } from "../entity/Distribuicao"

export interface IDistribuicao {

    serial: number
    medicamento_id: number
    quantidade: number
    saida: Date
    usuario_id: number
    cliente_id: number

    listarDistribuicoes(): Promise<Distribuicao[]>

    distribuirMedicamento(nome: string, quantidade: number, saida: Date, usuario_id: string, cliente_id: string)

    buscarDistribuicao(id: number): Promise<Distribuicao[] | void>

    buscarPorCliente(cpf: string): Promise<Distribuicao[] | void>

    buscarPorUsuario(login: string): Promise<Distribuicao[] | void>

    buscarPorMedicamento(nome: string): Promise<Distribuicao[] | void>

    buscarPorData(data1: string, data2: string): Promise<Distribuicao[] | void>
}