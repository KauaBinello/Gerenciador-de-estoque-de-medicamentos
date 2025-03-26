import { Medicamento } from "../entity/Medicamento"

export interface IMedicamento {

    id: number
    nome: string
    embalagem: string
    saldo: number
    validade: Date

    listarMedicamentos(): Promise<Medicamento[]>

    inserirMedicamento(nome: string, embalagem: string, saldo: number, validade: Date)

    exibirID(nome: string): Promise<number[] | void>

    buscarInformacoes(id: number): Promise<Medicamento[]>

    atualizarMedicamento(id: number, coluna: string, registro: string): Promise<void>

    deletarMedicamento(id: number): Promise<void>

}
