import { UsuarioService } from "../services/UsuarioService"
import promptSync from "prompt-sync"

export class UsuarioMenu {
    private usuario: UsuarioService
    private prompt: promptSync

    constructor() {
        this.usuario = new UsuarioService
        this.prompt = promptSync()
    }

    public async usuarioMenu() {

        let opcao: string

        console.log(`

Menu de usuário

Selecione a opção desejada

 1: Listar usuários
 2: Cadastrar usuários
 3: Buscar ID do usuário
 4: Buscar informações do usuário
 5: Atualizar usuário
 6: Deletar usuário
 7: Retornar ao menu principal
        
        `)

        opcao = await this.prompt("Qual opção deseja? ")

        switch (opcao) {
            case '1':
                console.table(await this.usuario.listarUSuarios())
                return this.usuarioMenu()

            case '2':
                let nome = await this.prompt('Qual o nome do usuário? ')
                let email = await this.prompt('Qual o e-mail do usuário? ')
                let login = await this.prompt('Qual o login do usuário? ')
                let senha = await this.prompt('Qual a senha de validade do usuário? ')
                await this.usuario.inserirUsuario(nome, email, login, senha)
                console.log('Usuário inserido com sucesso! ')
                return this.usuarioMenu()

            case '3':
                let exibirPorNome = await this.prompt('Qual o nome do usuário que deseja procurar? ')
                console.log(await this.usuario.exibirID(exibirPorNome))
                return this.usuarioMenu()

            case '4':
                let procurarPorNome = await this.prompt('Qual o nome do usuário que deseja procurar? ')
                let procurarPorID = await this.usuario.exibirID(procurarPorNome)
                console.table(await this.usuario.buscarInformacoes(procurarPorID[0]))
                return this.usuarioMenu()

            case '5':
                let atualizarPorNome = await this.prompt('Qual o nome do usuario que deseja atualizar? ')
                let atualizarPorID = await this.usuario.exibirID(atualizarPorNome)
                let coluna = await this.prompt("O que deseja atualizar? ")
                let registro = await this.prompt("Para o que desejar atualizar? ")
                await this.usuario.atualizarUsuario(atualizarPorID[0], coluna, registro)
                console.log('Usuário atualizado com sucesso')
                return this.usuarioMenu()

            case '6':
                let deletarPorNome = await this.prompt('Qual o nome do usuário que deseja deletar? ')
                let deletarPorID = await this.usuario.exibirID(deletarPorNome)
                await this.usuario.deletarUsuario(deletarPorID[0])
                console.log('Usuário deletado com sucesso! ')
                return this.usuarioMenu()

            case '7':
                return

            default:
                console.log("Opção inválida! Tente novamente.");
                return this.usuarioMenu()
        }
    }
}