import { Distribuicao } from "../entity/Distribuicao";
import { IDistribuicao } from "../interfaces/IDistribuicao";
import { DistribuicaoRepository } from "../repository/DistribuicaoRepository";
import { ClienteService } from "./ClienteService";
import { MedicamentoService } from "./MedicamentoService";
import { UsuarioService } from "./UsuarioService";

export class DistribuicaoService implements IDistribuicao {
    private usuario: UsuarioService
    private cliente: ClienteService
    private medicamento: MedicamentoService
    private repo: DistribuicaoRepository
    serial: number
    medicamento_id: number
    quantidade: number
    saida: Date
    usuario_id: number
    cliente_id: number

    constructor() {
        this.repo = new DistribuicaoRepository()
        this.medicamento = new MedicamentoService()
        this.usuario = new UsuarioService()
        this.cliente = new ClienteService()
    }

    async listarDistribuicoes(): Promise<Distribuicao[]> {
        return await this.repo.listarDistribuicoes()
    }

    public async distribuirMedicamento(nome: string, quantidade: number, saida: Date, usuario_nome: string, cliente_nome: string) {

        if(!nome){
            console.log('Informa o nome do medicamento.')
            return
        }
        let qtd = Number(quantidade)

        if (isNaN(qtd) || qtd <= 0) {
            console.log('Informe uma quantidade válida.');
            return;
        }

        let medicamento_id = Number(await this.medicamento.exibirID(nome))
        if (!medicamento_id) {
            console.log('Medicamento não encontrado.')
            return
        }
        
        let verificaoSaldo = await this.medicamento.verificaSaldo(nome)
        if (qtd > verificaoSaldo) {
            console.log('Quantidade indisponível.')
            return
        }

        let usuario_id = Number(await this.usuario.exibirID(usuario_nome))
        if (!usuario_id) {
            console.log('Usuário não encontrado.')
            return
        }

        let cliente_id = Number(await this.cliente.exibirID(cliente_nome))
        if (!cliente_id) {
            console.log('Cliente não encontrado.')
            return
        }

        await this.repo.distribuirMedicamento(medicamento_id, qtd, saida, usuario_id, cliente_id);
        console.log('Medicamento distribuído com sucesso.')
    }

    public async buscarDistribuicao(id: number): Promise<Distribuicao[] | void> {
        if (!id) {
            console.log('Distribuição não encontrada.')
            return
        }
        console.table(await this.repo.buscarDistribuicao(id))
    }

    public async buscarPorCliente(cpf: string): Promise<Distribuicao[] | void> {

        if (!/^\d{11}$/.test(cpf)) {
            console.log("CPF inválido! Deve conter exatamente 11 dígitos numéricos.")
            return
        }

        const cpfExiste = this.cliente.verificaCpf(cpf)
        if (!cpfExiste) {
            console.log('Histórico do cliente não encotradao.')
            return
        } else {
            console.table(await this.repo.buscarPorCliente(cpf))
        }
    }

    public async buscarPorUsuario(login: string): Promise<Distribuicao[] | void> {

        if (!/^.{3}$/.test(String(login).trim())) {
            console.log("O login deve conter exatamente 3 caracteres.");
            return;
        }

        const usuarioExiste = await this.usuario.verificaRetorno(login);

        if (!usuarioExiste) {
            console.log('Login não cadastrado no sistema.')
        } else {
            console.table(await this.repo.buscarPorUsuario(login))
        }
    }

    public async buscarPorMedicamento(nome: string): Promise<Distribuicao[] | void> {

        if (!nome.trim()) {
            console.log('O nome não pode ser deixado vazio. ')
            return
        }

        const nomeExiste = await this.medicamento.verificaRetorno(nome)

        if (!nomeExiste) {
            console.log(`O medicamento informado não está cadastrado.`)
        } else {
            console.table(await this.repo.buscarPorMedicamento(nome))
        }
    }

    public async buscarPorData(input1: string, input2: string): Promise<Distribuicao[] | void> {

        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(input1) || !/^\d{2}\/\d{2}\/\d{4}$/.test(input2)) {
            console.log('Data inválida. Use o formato DD/MM/AAAA.');
            return;
        }

        let [dia1, mes1, ano1] = input1.split('/');
        let [dia2, mes2, ano2] = input2.split('/');

        let data1 = new Date(Number(ano1), Number(mes1) - 1, Number(dia1));
        let data2 = new Date(Number(ano2), Number(mes2) - 1, Number(dia2));

        if (isNaN(data1.getTime()) || isNaN(data2.getDate())) {
            console.log('Data inválida. Certifique-se de que a data inserida é válida.');
            return;
        }

        console.table(await this.repo.buscarPorData(data1, data2))
    }
}