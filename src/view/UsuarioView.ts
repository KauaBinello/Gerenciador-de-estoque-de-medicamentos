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
 3: Buscar informações do usuário
 4: Atualizar usuário
 5: Deletar usuário
 6: Retornar ao menu principal
        
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
                let senha = await this.prompt('Qual a senha do usuário? ')

                await this.usuario.inserirUsuario(nome, email, login, senha)

                return this.usuarioMenu()

            case '3':
                let procurarPorLogin = await this.prompt('Qual o login do usuário que deseja procurar? ')
                
                await this.usuario.buscarInformacoes(procurarPorLogin)

                return this.usuarioMenu()

            case '4':
                let atualizarPorLogin = await this.prompt('Qual o login do usuario que deseja atualizar? ')

                                console.log(`

 Escolha o campo que deseja atualizar (escreva exatamente como está abaixo! ) :

 nome
 email
 login
 senha
`);

                let coluna = await this.prompt("O que deseja atualizar? ")
                let registro = await this.prompt("Para o que desejar atualizar? ")

                await this.usuario.atualizarUsuario(atualizarPorLogin, coluna, registro)

                return this.usuarioMenu()

            case '5':

                let deletarPorLogin = await this.prompt('Qual o login do usuário que deseja deletar? ')

                await this.usuario.deletarUsuario(deletarPorLogin)

                return this.usuarioMenu()

            case '6':
                return

            default:
                console.log("Opção inválida! Tente novamente.");
                return this.usuarioMenu()
        }
    }
}