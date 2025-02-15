import { Usuario } from "../entity/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService {
    private repo: UsuarioRepository

    constructor() {
        this.repo = new UsuarioRepository
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
}