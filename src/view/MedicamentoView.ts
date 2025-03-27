import { MedicamentoService } from "../services/MedicamentoService"
import promptSync from "prompt-sync"

export class MedicamentoMenu {
    private medicamento: MedicamentoService
    private prompt: promptSync

    constructor() {
        this.medicamento = new MedicamentoService
        this.prompt = promptSync()
    }

    public async medicamentoMenu() {

        let opcao: string

        console.log(`
            
 Menu de medicamentos

 1: Listar medicamentos
 2: Cadastrar medicamentos
 3: Buscar informações do medicamento
 4: Atualizar medicamento
 5: Deletar medicamento
 6: Retornar ao menu principal

        `)

        opcao = await this.prompt("Qual opção deseja? ")

        switch (opcao) {
            case '1':

                console.table(await this.medicamento.listarMedicamentos())

                return this.medicamentoMenu()

            case '2':

                let nome = await this.prompt('Qual o nome do medicamento? ')
                let embalagem = await this.prompt('Qual as informações de embalagem do medicamento? ')
                let saldo = parseInt(await this.prompt('Qual o saldo do medicamento? '))
                let validade = await this.prompt('Qual a data de validade do medicamento? ')
                await this.medicamento.inserirMedicamento(nome, embalagem, saldo, validade)

                return this.medicamentoMenu()

            case '3':

                let procurarPorNome = await this.prompt('Qual o nome do medicamento que deseja procurar? ')

                await this.medicamento.buscarInformacoes(procurarPorNome)

                return this.medicamentoMenu()

            case '4':

                let atualizarPorNome = await this.prompt('Qual o nome do medicamento que deseja atualizar? ')

                console.log(`

 Escolha o campo que deseja atualizar (escreva exatamente como está abaixo! ) :

 nome
 embalagem
 saldo
 validade
`);

                let coluna = await this.prompt("O que deseja atualizar? ")
                let registro = await this.prompt("Para o que desejar atualizar? ")

                await this.medicamento.atualizarMedicamento(atualizarPorNome, coluna, registro)

                return this.medicamentoMenu()

            case '5':

                let deletarPorNome = await this.prompt('Qual o nome do medicamento que deseja deletar? ')

                await this.medicamento.deletarMedicamento(deletarPorNome)

                return this.medicamentoMenu()

                case '6':
                    return
            default:

                console.log("Opção inválida! Tente novamente.");

                return this.medicamentoMenu()
        }
    }
}