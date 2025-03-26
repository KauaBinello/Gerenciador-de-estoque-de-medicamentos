import { Medicamento } from "../entity/Medicamento";
import { IMedicamento } from "../interfaces/IMedicamento";
import { MedicamentoRepository } from "../repository/MedicamentoRepository";

export class MedicamentoService implements IMedicamento {

    private repo: MedicamentoRepository
    id: number
    nome: string
    embalagem: string
    saldo: number
    validade: Date

    constructor() {
        this.repo = new MedicamentoRepository

    }

    public async listarMedicamentos(): Promise<Medicamento[]> {
        return await this.repo.listarMedicamentos()
    }

    public async verificaRetorno(nome): Promise<Boolean | void | string> {

        let lista: Medicamento[] = []
        lista = await this.repo.verificaRetorno(nome)
        if (lista.length < 1) {
            console.log('O medicamento informado não está cadastrado.')
        } else {
            console.log('Aqui está o ID do medicamento: ')
        }
        return lista.length > 0
    }

    public async inserirMedicamento(nome: string, embalagem: string, saldo: number, validade: any) {

        let dataVal: Date;

        if (!nome.trim()) {
            console.log('Informe o nome do medicamento. ')
            return
        }
        if (!embalagem.trim()) {
            console.log('As informações sobre a embalagem não podem ser deixadas vazias. ')
            return
        }
        if (typeof saldo !== "number" || isNaN(saldo)) {
            console.log('O saldo não pode estar vazio e/ou deve ser um número válido.');
            return;
        }
        if (typeof validade === 'string') {

            const [dia, mes, ano] = validade.split('/')
            dataVal = new Date(`${ano}-${mes}-${dia}`);
        } else if (validade instanceof Date) {
            dataVal = validade
        } else {
            console.log('A data de validade é inválida. ');
            return;
        }
        if (isNaN(dataVal.getTime())) {
            console.log('A data de validade é inválida. ');
            return;
        }
        const hoje = new Date();
        const doisMesesDepois = new Date(hoje.getFullYear(), hoje.getMonth() + 2, hoje.getDate());

        if (dataVal < doisMesesDepois) {
            console.log('O medicamento deve ter pelo menos 2 meses antes do vencimento.');
            return;
        }
        await this.repo.inserirMedicamento(nome, embalagem, saldo, dataVal)
    }

    public async exibirID(nome: string): Promise<number[] | void> {

        if (!nome.trim()) {
            console.log('Informe o nome do medicamento. ')
            return
        }
        let MedExiste = await this.verificaRetorno(nome)
        if (!MedExiste) {
            return
        }
        return await this.repo.exibirID(nome)
    }

    public async buscarInformacoes(id: number): Promise<Medicamento[]> {
        return await this.repo.buscarInformacoes(id)
    }

    public async atualizarMedicamento(id: number, coluna: string, registro: string): Promise<void> {
        await this.repo.atualizarMedicamento(id, coluna, registro)
    }

    public async deletarMedicamento(id: number): Promise<void> {
        await this.repo.deletarMedicamento(id)
    }
}