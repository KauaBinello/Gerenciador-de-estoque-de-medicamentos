import { Database } from "./repository/Database"
import { ClienteService } from "./services/ClienteService"
import { DistribuicaoService } from "./services/DistribuicaoService"
import { MedicamentoService } from "./services/MedicamentoService"
import { UsuarioService } from "./services/UsuarioService"
import { ClienteMenu } from "./view/CLienteView"
import { DistribuicaoMenu } from "./view/DistribuicaoView"
import { MedicamentoMenu } from "./view/MedicamentoView"
import { UsuarioMenu } from "./view/UsuarioView"

Database.iniciarConexao()

/*const cliente_Menu = new ClienteMenu
async function teste_ClienteMenu () {
    await cliente_Menu.clienteMenu()
} teste_ClienteMenu()


const medicamento_Menu = new MedicamentoMenu
async function teste_MedicamentoMenu () {
    await medicamento_Menu.medicamentoMenu()
} teste_MedicamentoMenu()


const usuario_Menu = new UsuarioMenu
async function teste_UsuarioMenu () {
    await usuario_Menu.usuarioMenu()
} teste_UsuarioMenu()*/

const distribuicao_Menu = new DistribuicaoMenu
async function teste_DistribuicaoMenu() {
    await distribuicao_Menu.distribuicaoMenu()
} teste_DistribuicaoMenu()