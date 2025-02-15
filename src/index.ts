import { Database } from "./repository/DataBaseRepository"
import { ClienteService } from "./services/ClienteService"
import { DistribuicaoService } from "./services/DistribuicaoService"
import { MedicamentoService } from "./services/MedicamentoService"
import { UsuarioService } from "./services/UsuarioService"

Database.iniciarConexao()

const ClienteServico = new ClienteService()
async function testeListarClientes() {
    console.table(await ClienteServico.listarClientes())
}
//testeListarClientes()


const UsuarioServico = new UsuarioService()
async function testeListarUsuarios() {
    console.table(await UsuarioServico.listarUSuarios())
}
//testeListarUsuarios()


const MedicamentoServico = new MedicamentoService()
async function testeListarMedicamentos() {
    console.table(await MedicamentoServico.listarMedicamentos())
}
//testeListarMedicamentos()


const DistribuicaoServico = new DistribuicaoService()
async function testeListarDistribuicoes() {
    console.table(await DistribuicaoServico.listarDistribuicoes())
}
//testeListarDistribuicoes()

async function teste_ExibirID() {
    console.table(await ClienteServico.exibirID('Alan Fernando'))

}
//teste_ExibirID()

async function teste_BuscaPorID() {
    console.table(await ClienteServico.buscaPorID(1))
}
//teste_BuscaPorID()

async function teste_inserirCliente() {
    const currentDate: Date = new Date(2003, 3, 24)
    ClienteServico.inserirCliente('Kauã', '65321485644', 'Rua tal', '2022', 'Centro', 'Taquara','RS', '51985362147', currentDate)
}
//teste_inserirCliente()

async function teste_inserirUsuario() {
    UsuarioServico.inserirUsuario('Marcos', 'tetudo@.com', 'mpp', 'mpp')
}
teste_inserirUsuario()