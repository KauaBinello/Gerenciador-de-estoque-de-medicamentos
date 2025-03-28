import { Usuario } from "../entity/Usuario";
import { IUsuario } from "../interfaces/IUsuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService implements IUsuario {
    private repo: UsuarioRepository
    id: number
    nome: string
    email: string
    login: string
    senha: string

    constructor() {
        this.repo = new UsuarioRepository()
    }

    async listarUSuarios(): Promise<Usuario[]> {
        return await this.repo.listarUsuarios()
    }

    async inserirUsuario(nome: string, email: string, login: string, senha: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const emailValidacao = emailRegex.test(email)

        if (emailValidacao == false) {
            throw new Error('Email inválido')
        }
        await this.repo.inserirUsuario(nome, email, login, senha)
    }

    public async exibirID(nome: string): Promise<number[] | void> {

        if (!nome.trim()) {
            console.log('Informe o nome do cliente. ')
            return
        }

        let id = await this.repo.exibirID(nome)
        console.log (id)
        return id
    }

    public async buscarInformacoes(id: number): Promise<Usuario[]> {
        return await this.repo.buscarInformacoes(id)
    }

    public async atualizarUsuario(id: number, coluna: string, registro: string): Promise<void> {
        await this.repo.atualizarUsuario(id, coluna, registro)
    }

    public async deletarUsuario(id: number): Promise<void> {
        await this.repo.deletarUsuario(id)
    }

}