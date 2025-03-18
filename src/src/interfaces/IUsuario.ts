import { Usuario } from "../entity/Usuario"

export interface IUsuario {

    id: number
    nome: string
    email: string
    login: string
    senha: string

    listarUSuarios(): Promise<Usuario[]>

    inserirUsuario(nome: string, email: string, login: string, senha: string)

    exibirID(nome: string): Promise<number[]>

    buscarInformacoes(id: number): Promise<Usuario[]>

    atualizarUsuario(id: number, coluna: string, registro: string): Promise<void>

    deletarUsuario(id: number): Promise<void>
}