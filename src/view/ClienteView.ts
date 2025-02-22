import { ClienteService } from "../services/ClienteService"
import promptSync from "prompt-sync"

export class ClienteMenu {
    private cliente: ClienteService
    private prompt: promptSync

    constructor() {
        this.cliente = new ClienteService
        this.prompt = promptSync()
    }

    public async clienteMenu() {

        let opcao: string

        console.log("");
        console.log("Menu de clientes ");
        console.log("");
        console.log("1 - Listar clientes ");
        console.log("2 - Cadastrar cliente ");
        console.log("3 - Buscar ID do cliente ");
        console.log("4 - Buscar informações do cliente ");
        console.log("5 - Atualizar clientes ");
        console.log("6 - Deletar clientes ")
        console.log("7 - Retornar ao menu principal ");
        console.log("");
        opcao = await this.prompt("Qual opção deseja? ")
        console.log("");

        switch (opcao) {
            case '1':
                console.table(await this.cliente.listarClientes())
                return this.clienteMenu()

            case '2':
                let nome = await this.prompt('Qual o nome do cliente? ')
                let cpf = await this.prompt('Qual o cpf do cliente? ')
                let endereco = await this.prompt('Qual o endereço do cliente? ')
                let numero_residencial = await this.prompt('Qual o número residencial do cliente? ')
                let bairro = await this.prompt('Qual o bairro do cliente? ')
                let cidade = await this.prompt('Qual a cidade do cliente? ')
                let uf = await this.prompt('Qual a UF do cliente? ')
                let telefone = await this.prompt('Qual o telefone do cliente? ')
                let nascimento = await this.prompt('Qual a data de nascimento do cliente? ')
                await this.cliente.inserirCliente(nome, cpf, endereco, numero_residencial, bairro, cidade, uf, telefone, nascimento)
                console.log('Cliente inserido com sucesso! ')
                return this.clienteMenu()

            case '3':
                let exibirPorNome = await this.prompt('Qual o nome do cliente que deseja procurar? ')
                console.log(await this.cliente.exibirID(exibirPorNome))
                return this.clienteMenu()

            case '4':
                let procurarPorNome = await this.prompt('Qual o nome do cliente que deseja procurar? ')
                let procurarPorID = await this.cliente.exibirID(procurarPorNome)
                console.table(await this.cliente.buscarInformacoes(procurarPorID[0]))
                return this.clienteMenu()

            case '5':
                let atualizarPorNome = await this.prompt('Qual o nome do cliente que deseja atualizar? ')
                let atualizarPorID = await this.cliente.exibirID(atualizarPorNome)
                let coluna = await this.prompt("O que deseja atualizar? ")
                let registro = await this.prompt("Para o que desejar atualizar? ")
                await this.cliente.atualizarCliente(atualizarPorID[0], coluna, registro)
                console.log('Cliente atualizado com sucesso')
                return this.clienteMenu()

            case '6':
                let deletarPorNome = await this.prompt('Qual o nome do cliente que deseja deletar? ')
                let deletarPorID = await this.cliente.exibirID(deletarPorNome)
                await this.cliente.deletarCliente(deletarPorID[0])
                console.log('Cliente deletado com sucesso! ')
                return this.clienteMenu()

            case '7':
                break;

            default:
                console.log("Opção inválida! Tente novamente.");
                return this.clienteMenu()
        }
    }
}