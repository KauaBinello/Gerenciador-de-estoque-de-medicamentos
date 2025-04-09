import { ClienteMenu } from "./view/ClienteView";
import { DistribuicaoMenu } from "./view/DistribuicaoView";
import { MedicamentoMenu } from "./view/MedicamentoView";
import { UsuarioMenu } from "./view/UsuarioView";
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
            console.log(`
 Estoque de medicamentos

 1: Clientes
 2: Medicamentos
 3: Usuários
 4: Distribuições
 5: Sair

            `)

            opcao = await this.prompt('Selecione uma opção? ')

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
