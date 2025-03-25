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

        console.log(`)
        opcao = await this.prompt("Qual opção deseja? ")

        switch (opcao) {
            case '1':
                console.table(await this.distribuicao.listarDistribuicoes())
                return this.distribuicaoMenu()

            case '2':
                let nome = await this.prompt('Qual o nome do medicamento? ')
                let medicamento_id = await this.medicamento.exibirID(nome)

                let quantidade = await this.prompt('Qual a quantidade a distribuir? ')

                let saida = await new Date()

                let usuario = await this.prompt('Qual o nome do usuario? ')
                let usuario_id = await this.usuario.exibirID(usuario)

                let cliente = await this.prompt('Qual o nome do cliente? ')
                let cliente_id = await this.cliente.exibirID(cliente)

                await this.distribuicao.distribuirMedicamento(medicamento_id[0], quantidade, saida, usuario_id[0], cliente_id[0])
                console.log('Medicamento distruibuido com sucesso! ')
                return this.distribuicaoMenu()

            case '3':
                let exibirPorID = await this.prompt('Qual ID desta distribuição? ')
                console.table(await this.distribuicao.buscarDistribuicao(exibirPorID))
                return this.distribuicaoMenu()

            case '4':
                let clienteNome = await this.prompt('Qual o nome do cliente que deseja pesquisar? ')
                let procurarPorCliente = await this.cliente.exibirID(clienteNome)
                console.table(await this.distribuicao.buscarPorCliente(procurarPorCliente[0]))
                return this.distribuicaoMenu()

            case '5':
                let usuarioNome = await this.prompt('Qual o nome do usuário que deseja pesquisar? ')
                let procurarPorUsuario = await this.usuario.exibirID(usuarioNome)
                console.table(await this.distribuicao.buscarPorCliente(procurarPorUsuario[0]))
                return this.distribuicaoMenu()

            case '6':
                let medicamentoNome = await this.prompt('Qual o nome do medicamento que deseja pesquisar? ')
                let procurarPorMedicamento = await this.medicamento.exibirID(medicamentoNome)
                console.log(procurarPorMedicamento)
                console.table(await this.distribuicao.buscarPorMedicamento(procurarPorMedicamento[0]))
                return this.distribuicaoMenu()

            case '7':
                let input1 = await this.prompt('De qual data? (DD/MM/AAAA) ');
                let input2 = await this.prompt('Até qual data? (DD/MM/AAAA) ');

                let [dia1, mes1, ano1] = input1.split('/');
                let [dia2, mes2, ano2] = input2.split('/');

                let data1 = new Date(Number(ano1), Number(mes1) - 1, Number(dia1));
                let data2 = new Date(Number(ano2), Number(mes2) - 1, Number(dia2));

                console.table(await this.distribuicao.buscarPorData(data1, data2))

                return this.distribuicaoMenu()
            case '8':
                break;

            default:
                console.log("Opção inválida! Tente novamente.");
                return this.distribuicaoMenu()
        }
    }
}