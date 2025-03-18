export class Medicamento {
    private id: number
    private nome: string
    private embalagem: string
    private saldo: number
    private validade: Date

    constructor(id: number, nome: string, embalagem: string, saldo: number, validade: Date) {
        this.id = id
        this.nome = nome
        this.embalagem = embalagem
        this.saldo = saldo
        this.validade = validade
    }
}