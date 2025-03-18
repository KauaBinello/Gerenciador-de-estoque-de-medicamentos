import { Distribuicao } from "../entity/Distribuicao"

export interface IDistribuicao {

    serial: number
    medicamento_id: number
    quantidade: number
    saida: Date
    usuario_id: number
    cliente_id: number

    listarDistribuicoes(): Promise<Distribuicao[]>

    distribuirMedicamento(medicamento_id: number, quantidade: number, saida: Date, usuario_id: number, cliente_id: number)
    
    buscarDistribuicao(id: number): Promise<Distribuicao[]>

    buscarPorCliente(id: number): Promise<Distribuicao[]>

    buscarPorUsuario(id: number): Promise<Distribuicao[]>

    buscarPorMedicamento(id: number): Promise<Distribuicao[]>

    buscarPorData(data1: Date, data2: Date): Promise<Distribuicao[]>
}