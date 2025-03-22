import { Cliente } from "../entity/Cliente";
import { ICliente } from "../interfaces/ICliente";
import { ClienteRepository } from "../repository/ClienteRepository";

export class ClienteService implements ICliente {
    private repo: ClienteRepository
    id: number
    nome: string
    cpf: string
    endereco: string
    numero_residencial: string
    bairro: string
    cidade: string
    uf: string
    telefone: string
    nascimento: Date

    constructor() {
        this.repo = new ClienteRepository
    }

    public async listarClientes(): Promise<Cliente[]> {
        return await this.repo.listarClientes()
    }

    public async verificaCpf(cpf): Promise<Boolean> {
        let lista: Cliente[] = []
        lista = await this.repo.verificaCpf(cpf)
        return lista.length > 0
    }

    public async inserirCliente(nome: string, cpf: string, endereco: string, numero_residencial: string, bairro: string, cidade: string, uf: string, telefone: string, nascimento: any) {

        const ufValida = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]

        if (!nome.trim()) {
            console.log('O nome não pode ser deixado vazio. ')
            return
        }
        if (!/^\d{11}$/.test(cpf)) {
            console.log('CPF inválido! Deve conter exatamente 11 dígitos numéricos. ')
            return
        }
        const cpfExiste = await this.verificaCpf(cpf);
        if (cpfExiste) {
            console.log('O CPF informado já está cadastrado.');
            return;
        }
        if (!endereco.trim()) {
            console.log('O endereço é um campo obrigatório. ')
            return
        }
        if (!numero_residencial.trim()) {
            console.log('O número residencial não pode ser deixado vazio. ')
            return
        }
        if (!bairro.trim()) {
            console.log('O bairro é um campo obrigatório.')
            return
        }
        if (!cidade.trim()) {
            console.log('A cidade inválida! Deve conter pelo menos 3 caracteres! ')
            return
        }
        if (uf.length !== 2 || !ufValida.includes(uf.toUpperCase())) {
            console.log("A sigla do estado (UF) deve ser válida e conter 2 caracteres.");
            return;
        }
        if (!/^\d{10,11}$/.test(telefone)) {
            console.log('O telefone deve conter 10 ou 11 dígitos numéricos. ')
            return
        }
        let dataNasc: Date;
        if (typeof nascimento === 'string') {

            const [dia, mes, ano] = nascimento.split('/')
            dataNasc = new Date(`${ano}-${mes}-${dia}`);
        } else if (nascimento instanceof Date) {
            dataNasc = nascimento
        } else {
            console.log('A data de nascimento é inválida. ');
            return;
        }
        if (isNaN(dataNasc.getTime())) {
            console.log('A data de nascimento é inválida. ');
            return;
        }
        const dataHoje = new Date();
        if (dataNasc > dataHoje) {
            console.log('A data de nascimento não pode ser maior que a data de hoje.');
            return;
        }
        await this.repo.inserirCliente(nome, cpf, endereco, numero_residencial, bairro, cidade, uf, telefone, dataNasc)
        console.log('Cliente inserido com sucesso! ')
    }

    public async exibirID(cpf: string): Promise<number[]> {
        if (!/^\d{11}$/.test(cpf)) {
            console.log('CPF inválido! Deve conter exatamente 11 dígitos numéricos. ')
            return await this.repo.exibirID(cpf)
        }
        const clienteExistente = await this.repo.verificaCpf(cpf);
        if (clienteExistente.length === 0) {
            console.log('CPF não encontrado no banco de dados.');
            return []
        }
        return await this.repo.exibirID(cpf)
    }

    public async buscarInformacoes(id: number): Promise<Cliente[]> {
        return await this.repo.buscarInformacoes(id)
    }

    public async atualizarCliente(id: number, coluna: string, registro: string): Promise<void> {

        const colunaValida = ['nome', 'cpf', 'endereco', 'numero_residencial', 'bairro', 'cidade', 'uf', 'telefone', 'nascimento']
        const ufValida = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]

        if (!colunaValida.includes(coluna)) {
            console.log("Coluna inválida ou não permitida!");
            return
        }

        switch (coluna) {
            case 'nome':
                if (!registro.trim()) {
                    console.log('O nome não pode ser deixado vazio. ')
                    return
                }
                break;

            case 'cpf':
                if (!/^\d{11}$/.test(registro)) {
                    console.log("CPF inválido! Deve conter exatamente 11 dígitos numéricos.");
                    return;
                }
                const cpfExiste = await this.verificaCpf(registro);
                if (cpfExiste) {
                    console.log("O CPF informado já está cadastrado.");
                    return;
                }
                break;

            case 'endereco':
                if (!registro.trim()) {
                    console.log('O endereço é um campo obrigatório. ')
                    return
                }
                break;

            case 'numero_resisdencial':
                if (!registro.trim()) {
                    console.log('O número residencial não pode ser deixado vazio. ')
                    return
                }
                break;

            case 'bairro':
                if (!registro.trim()) {
                    console.log('O bairro é um campo obrigatório.')
                    return
                }
                break;

            case 'cidade':
                if (!registro.trim()) {
                    console.log('A cidade inválida! Deve conter pelo menos 3 caracteres! ')
                    return
                }
                break;

            case 'uf':
                if (registro.length !== 2 || !ufValida.includes(registro.toUpperCase())) {
                    console.log("A sigla do estado (UF) deve ser válida e conter 2 caracteres.");
                    return;
                }
                break;

            case 'telefone':
                if (!/^\d{10,11}$/.test(registro)) {
                    console.log('O telefone deve conter 10 ou 11 dígitos numéricos. ')
                    return
                }
                break;

            case 'nascimento':
                let dataNasc: Date;
                if (typeof registro === 'string') {
                    const [dia, mes, ano] = registro.split('/');

                    dataNasc = new Date(`${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`);
                } else if (Object.prototype.toString.call(registro) === '[object Date]') {
                    dataNasc = registro;
                } else {
                    console.log('A data de nascimento é inválida.');
                    return;
                }

                if (isNaN(dataNasc.getTime())) {
                    console.log('A data de nascimento é inválida.');
                    return;
                }

                const dataHoje = new Date();
                if (dataNasc > dataHoje) {
                    console.log('A data de nascimento não pode ser maior que a data de hoje.');
                    return;
                }
                await this.repo.atualizarCliente(id, coluna, registro);
                console.log('Cliente atualizado com sucesso');
        }
    }

    public async deletarCliente(id: number): Promise<void> {
        await this.repo.deletarCliente(id)
    }
}
