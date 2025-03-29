import { Usuario } from "../entity/Usuario"

export interface IUsuario {

    id: number
    nome: string
    email: string
    login: string
    senha: string

    listarUSuarios(): Promise<Usuario[]>

    inserirUsuario(nome: string, email: string, login: string, senha: string)

    exibirID(nome: string): Promise<number[] | void>

    buscarInformacoes(login: string): Promise<Usuario[] | void>

    atualizarUsuario(login: string, coluna: string, registro: string): Promise<void>

    deletarUsuario(string): Promise<void>
}