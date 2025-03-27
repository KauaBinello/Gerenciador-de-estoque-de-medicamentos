import { get } from "http"
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

        console.log(`
 Menu de clientes

 1: Listar clientes
 2: Cadastrar cliente
 3: Buscar informações do cliente
 4: Atualizar clientes
 5: Deletar clientes
 6: Retornar ao menu principal
`)

        opcao = await this.prompt("Qual opção deseja? ")

        console.log("");

        switch (opcao) {

            case '1':

                console.table(await this.cliente.listarClientes())

                return this.clienteMenu()

            case '2':

                let nome = await this.prompt('Qual o nome do cliente? ');
                let cpf = await this.prompt('Qual o CPF do cliente? ');
                let endereco = await this.prompt('Qual o endereço do cliente? ');
                let numero_residencial = await this.prompt('Qual o número residencial do cliente? ');
                let bairro = await this.prompt('Qual o bairro do cliente? ');
                let cidade = await this.prompt('Qual a cidade do cliente? ');
                let uf = (await this.prompt('Qual a UF do cliente? ')).toUpperCase();
                let telefone = await this.prompt('Qual o telefone do cliente? ');
                let nascimentoStr = await this.prompt('Qual a data de nascimento do cliente? (YYYY/MM/DD) ')

                await this.cliente.inserirCliente(nome, cpf, endereco, numero_residencial, bairro, cidade, uf, telefone, nascimentoStr)

                return this.clienteMenu()


            case '3':

                let procurarPorCpf = await this.prompt('Qual o cpf do cliente que deseja buscar? ')

                await this.cliente.buscarInformacoes(procurarPorCpf)

                return this.clienteMenu()

            case '4':
                let atualizarPorCpf = await this.prompt('Qual o cpf do cliente que deseja atualizar? ')

                console.log(`

 Escolha o campo que deseja atualizar, (escreva exatamente como está abaixo! ) :

 nome
 cpf
 endereco
 numero_residencial
 bairro
 cidade
 uf
 telefone
 nascimento
`);

                let coluna = await this.prompt("O que deseja atualizar? ")
                let registro = await this.prompt("Para o que desejar atualizar? ")

                await this.cliente.atualizarCliente(atualizarPorCpf, coluna, registro)

                return this.clienteMenu()

            case '5':
                let getCpf = await this.prompt('Qual o cpf do cliente que deseja deletar? ')

                await this.cliente.deletarCliente(getCpf)

                return this.clienteMenu()

            default:
                console.log("Opção inválida! Tente novamente.");

                return this.clienteMenu()
        }
    }
}