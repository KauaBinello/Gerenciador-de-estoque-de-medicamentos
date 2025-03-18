import { ClienteMenu } from "./ClienteView";
import { DistribuicaoMenu } from "./DistribuicaoView";
import { MedicamentoMenu } from "./MedicamentoView";
import { UsuarioMenu } from "./UsuarioView";
import promptSync from "prompt-sync"

export class MenuPrincipal {
    private menuCliente: ClienteMenu
    private menuUsuario: UsuarioMenu
    private menuMedicamento: MedicamentoMenu
    private menuDistribuicao: DistribuicaoMenu
    private prompt: promptSync

    constructor() {
        this.menuCliente = new ClienteMenu()
        this.menuUsuario = new UsuarioMenu()
        this.menuMedicamento = new MedicamentoMenu()
        this.menuDistribuicao = new DistribuicaoMenu()
        this.prompt = promptSync()
    }

    public async menuPrincipal() {
        let opcao = ''

        while (opcao !== '5') {
            console.log("");
            console.log("Estoque de medicamentos ");
            console.log("");
            console.log("1 - Clientes ");
            console.log("2 - Medicamentos ");
            console.log("3 - Usuários ");
            console.log("4 - Distribuições");
            console.log("5 - Sair ");
            console.log("");
            opcao = await this.prompt('Selecione uma opção? ')
            console.log("");

            switch (opcao) {
                case '1':
                    await this.menuCliente.clienteMenu()
                    break;
                case '2':
                    await this.menuMedicamento.medicamentoMenu()
                    break;
                case '3':
                    await this.menuUsuario.usuarioMenu()
                    break;
                case '4':
                    await this.menuDistribuicao.distribuicaoMenu()
                    break;
                case '5':
                    console.log("Você saiu do sistema!");
                    break;
                default:
                    console.log("Opção inválida! Tente novamente.");
                    break;
            }
        }
    }
}

const menuPrincipal = new MenuPrincipal
async function chamaMenuPrincipal() {
    await menuPrincipal.menuPrincipal()
} chamaMenuPrincipal()
