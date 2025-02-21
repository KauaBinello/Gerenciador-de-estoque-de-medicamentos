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

        console.log("");
        console.log("Menu de distruibuição ");
        console.log("");
        console.log("Selecione a opção desejada ");
        console.log("");
        console.log("1 - Listar distribuiçõess ");
        console.log("2 - Distribuir medicamentos ");
        console.log("3 - Buscar ID de distribuição ");
        console.log("4 - Buscar distribuição ");
        console.log("5 - Buscar distribuições por cliente ");
        console.log("6 - Buscar distruibuições por usuário ")
        console.log("7 - Buscar distribuições por medicamento")
        console.log('8 - Buscar distribuições por data')
        console.log("9 - Retornar ao menu principal ");
        console.log("");
        opcao = await this.prompt("Qual opção deseja? ")
        console.log("");

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


            case '8':


            case '9':
                console.log("Você saiu do sistema!");
                break;

            default:
                console.log("Opção inválida! Tente novamente.");
                return this.distribuicaoMenu()
        }
    }
}