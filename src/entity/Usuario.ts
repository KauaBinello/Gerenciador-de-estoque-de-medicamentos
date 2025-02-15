export class Usuario {
    private id: number
    private nome: string
    private email: string
    private login: string
    private senha: string

    constructor(id: number, nome: string, email:string, login: string, senha: string) {
        this.id = id
        this.nome = nome
        this.email = email
        this.login = login
        this.senha = senha
    }
}