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

    public async entradaMedicamento(nome: string, quantidade: any) {
        
        const qtd = Number(quantidade)
    
        if (!nome.trim()) {
            console.log('Informe o nome do medicamento.');
            return;
        }
    
        const nomeExiste = await this.verificaRetorno(nome);
    
        if (!nomeExiste) {
            console.log('O medicamento informado não está cadastrado.');
            return;
        }
    
        if (isNaN(qtd) || qtd <= 0) {
            console.log('Informe uma quantidade válida.');
            return;
        }
    
        await this.repo.entradaMedicamento(nome, qtd);
        console.log('Saldo atualizado.');
    }

    public async verificaRetorno(nome): Promise<Boolean> {

        let lista: Medicamento[] = await this.repo.verificaRetorno(nome)
        return lista.length > 0
    }

    public async verificaSaldo(nome) {

        let saldo = Number(await this.repo.verificaSaldo(nome))
        if (saldo > 0) {
            return saldo
        } else {
            console.log('Medicamento indisponível no momento.')
            return 0
        }
    }

    public async exibirID(nome: string): Promise<number[] | void> {

        if (!nome.trim()) {
            console.log('Informe o nome do cliente. ')
            return
        }


        let id = await this.repo.exibirID(nome)
        return id

    }

    public async inserirMedicamento(nome: string, embalagem: string, saldo: number, validadeStr: string) {

        if (!nome.trim()) {
            console.log('Informe o nome do medicamento. ')
            return
        }
        const nomeExiste = await this.verificaRetorno(nome)

        if (nomeExiste) {
            console.log(`O medicamento informado já está cadas trado.`)
            return
        }

        if (!embalagem.trim()) {
            console.log('As informações sobre a embalagem não podem ser deixadas vazias. ')
            return
        }
        let qtd = Number(saldo)

        if (isNaN(qtd) || qtd <= 0) {
            console.log('Informe uma quantidade válida.');
            return;
        }

        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(validadeStr)) {
            console.log('Data de nascimento inválida. Use o formato DD/MM/AAAA.');
            return;
        }

        const [dia, mes, ano] = validadeStr.split('/');
        const validadeFormatado = `${ano}-${mes}-${dia}`;

        const validade = new Date(validadeFormatado);

        if (isNaN(validade.getTime())) {
            console.log('Data de validade inválida. Certifique-se de que a data inserida é válida.');
            return;
        }
        const hoje = new Date();
        const doisMesesDepois = new Date(hoje.getFullYear(), hoje.getMonth() + 2, hoje.getDate());

        if (validade < doisMesesDepois) {
            console.log('O medicamento deve ter pelo menos 2 meses antes do vencimento.');
            return;
        }
        await this.repo.inserirMedicamento(nome, embalagem, qtd, validade)
        console.log('Medicamento inserido com sucesso! ')
    }

    public async buscarInformacoes(nome: string) {

        if (!nome.trim()) {
            console.log('Informe o nome do medicamento. ')
            return
        }

        const nomeExiste = await this.verificaRetorno(nome)

        if (!nomeExiste) {
            console.log(`O medicamento informado não está cadastrado.`)
            return
        } else {
            console.table(await this.repo.buscarInformacoes(nome))
        }
    }

    public async atualizarMedicamento(nome: string, coluna: string, registro: any): Promise<void> {

        const colunaValida = ['nome', 'embalagem', 'saldo', 'validade']

        const nomeExiste = await this.verificaRetorno(nome)

        if (!nomeExiste) {
            console.log(`O medicamento informado não está cadastrado.`)
            return
        } else {
            if (!colunaValida.includes(coluna)) {
                console.log("Coluna inválida ou não permitida!");
                return
            } else
                switch (coluna) {
                    case 'nome':
                        if (!registro.trim()) {
                            console.log('Informe o nome do medicamento. ')
                            return
                        }
                        break

                    case 'embalagem':
                        if (!registro.trim()) {
                            console.log('As informações sobre a embalagem não podem ser deixadas vazias. ')
                            return
                        }
                        break

                    case 'saldo':
                        let qtd = Number(registro)

                        if (isNaN(qtd) || qtd <= 0) {
                            console.log('Informe uma quantidade válida.');
                            return;
                        }
                        const saldoConvertido = Number(qtd)
                        if (typeof saldoConvertido !== "number" || isNaN(saldoConvertido)) {
                            console.log('O saldo não pode estar vazio e/ou deve ser um número válido.');
                            return;
                        }
                        break

                    case 'validade':
                        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(registro)) {
                            console.log('Data de nascimento inválida. Use o formato DD/MM/AAAA.');
                            return;
                        }

                        const [dia, mes, ano] = registro.split('/');
                        const validadeFormatado = `${ano}-${mes}-${dia}`;

                        const validade = new Date(validadeFormatado);

                        if (isNaN(validade.getTime())) {
                            console.log('Data de validade inválida. Certifique-se de que a data inserida é válida.');
                            return;
                        }
                        const hoje = new Date();
                        const doisMesesDepois = new Date(hoje.getFullYear(), hoje.getMonth() + 2, hoje.getDate());

                        if (validade < doisMesesDepois) {
                            console.log('O medicamento deve ter pelo menos 2 meses antes do vencimento.');
                            return;
                        }
                        break
                }
        }
        await this.repo.atualizarMedicamento(nome, coluna, registro)
        console.log('Medicamento atualizado com sucesso')
    }

    public async deletarMedicamento(nome: string): Promise<void> {

        if (!nome.trim()) {
            console.log('O nome não pode ser deixado vazio. ')
            return
        }

        const nomeExiste = await this.verificaRetorno(nome)

        if (!nomeExiste) {
            console.log(`O medicamento informado não está cadastrado.`);
        } else {
            await this.repo.deletarMedicamento(nome);
            console.log('Medicamento deletado com sucesso!')
        }
    }
}