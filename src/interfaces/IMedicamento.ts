import { Medicamento } from "../entity/Medicamento"

export interface IMedicamento {

    id: number
    nome: string
    embalagem: string
    saldo: number
    validade: Date

    listarMedicamentos(): Promise<Medicamento[]>

    verificaRetorno(nome): Promise<Boolean>

    inserirMedicamento(nome: string, embalagem: string, saldo: number, validade: string)

    buscarInformacoes(nome: string)

    atualizarMedicamento(nome: string, coluna: string, registro: string): Promise<void>

    deletarMedicamento(nome: string): Promise<void>

}
