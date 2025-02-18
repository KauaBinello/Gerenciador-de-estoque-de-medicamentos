import { Cliente } from "../entity/Cliente"
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
        console.log("Menu do cliente ");
        console.log("");
        console.log("Selecione a opção desejada ");
        console.log("");
        console.log("1 - Listar clientes");
        console.log("2 - Cadastrar cliente ");
        console.log("3 - Procurar clientes ");
        console.log("4 - Atualizar cliente");
        console.log("5 - Deletar clientes");
        console.log("6 - Sair ");
        console.log("");
        opcao = await this.prompt("Qual opção deseja? ")
        console.log("");

        switch (opcao) {
            case '1':
                console.table(await this.cliente.listarClientes())
                break;
            case '2':
                await this.cliente.inserirCliente(this.prompt.nome, this.prompt.cpf, this.prompt.endereco, this.prompt.numero_residencial, this.prompt.bairro, this.prompt.cidade, this.prompt.uf, this.prompt.telefone, this.prompt.nascimento)
                break;
            case '3':
                console.log("Você saiu do sistema!");
                break;
            default:
                console.log("Opção inválida! Tente novamente.");
                break;
        }
    }


    public exibirMenu(): void { }


}