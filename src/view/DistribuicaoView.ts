import promptSync from "prompt-sync"
import { DistribuicaoService } from "../services/DistribuicaoService"
import { ClienteService } from "../services/ClienteService"
import { MedicamentoService } from "../services/MedicamentoService"
import { UsuarioService } from "../services/UsuarioService"

export class DistribuicaoMenu {
    private usuario: UsuarioService
    private cliente: ClienteService
    private medicamento: MedicamentoService
    private distribuicao: DistribuicaoService
    private prompt: promptSync

    constructor() {
        this.usuario = new UsuarioService()
        this.cliente = new ClienteService()
        this.medicamento = new MedicamentoService()
        this.distribuicao = new DistribuicaoService()
        this.prompt = promptSync()
    }

    public async distribuicaoMenu() {

        let opcao: string

        console.log(`

 Menu de distruibuição

 1: Listar distribuições
 2: Distribuir medicamentos
 3: Buscar distribuição
 4: Buscar distribuições por cliente
 5: Buscar distruibuições por usuário
 6: Buscar distribuições por medicamento
 7: Buscar distribuições por data
 8: Retornar ao menu principal

 `)
        opcao = await this.prompt("Qual opção deseja? ")

        switch (opcao) {
            case '1':

                console.table(await this.distribuicao.listarDistribuicoes())

                return this.distribuicaoMenu() //oi 

                break

            case '2':
                let nome = await this.prompt('Qual o nome do medicamento? ')

                let quantidade = await this.prompt('Qual a quantidade a distribuir? ')

                let saida = await new Date()

                let usuario = await this.prompt('Qual o login do usuario? ')

                let cliente = await this.prompt('Qual o CPF do cliente? ')

                await this.distribuicao.distribuirMedicamento(nome, quantidade, saida, usuario, cliente)

                return this.distribuicaoMenu()

            case '3':

                let exibirPorID = await this.prompt('Qual ID desta distribuição? ')

                await this.distribuicao.buscarDistribuicao(exibirPorID)

                return this.distribuicaoMenu()

            case '4':

                let clienteCpf = await this.prompt('Qual o CPF do cliente que deseja pesquisar? ')

                await this.distribuicao.buscarPorCliente(clienteCpf)

                return this.distribuicaoMenu()

            case '5':
                let usuarioLogin = await this.prompt('Qual o login do usuário que deseja pesquisar? ')

                await this.distribuicao.buscarPorUsuario(usuarioLogin)

                return this.distribuicaoMenu()

            case '6':

                let medicamentoNome = await this.prompt('Qual o nome do medicamento que deseja pesquisar? ')

                await this.distribuicao.buscarPorMedicamento(medicamentoNome)

                return this.distribuicaoMenu()

            case '7':
                let input1 = await this.prompt('De qual data? (DD/MM/AAAA) ');
                let input2 = await this.prompt('Até qual data? (DD/MM/AAAA) ');

                await this.distribuicao.buscarPorData(input1, input2)

                return this.distribuicaoMenu()

            case '8':
                return

            default:
                
                console.log("Opção inválida! Tente novamente.");
                return this.distribuicaoMenu()
        }
    }
}