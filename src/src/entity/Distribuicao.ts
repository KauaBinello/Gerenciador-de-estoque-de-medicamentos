export class Distribuicao {
    private serial: number
    private medicamento_id: number
    private quantidade: number
    private saida: Date
    private usuario_id: number
    private cliente_id: number

    constructor(serial: number, medicamento_id: number, quantidade: number, saida: Date, usuario_id: number, cliente_id: number) {
        this.serial = serial
        this.medicamento_id = medicamento_id
        this.quantidade = quantidade
        this.saida = saida
        this.usuario_id = usuario_id
        this.cliente_id = cliente_id
    }
}