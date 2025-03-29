import { Usuario } from "../entity/Usuario";
import { IUsuario } from "../interfaces/IUsuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService implements IUsuario {
    private repo: UsuarioRepository
    id: number
    nome: string
    email: string
    login: string
    senha: string

    constructor() {
        this.repo = new UsuarioRepository()
    }

    async listarUSuarios(): Promise<Usuario[]> {
        return await this.repo.listarUsuarios()
    }

    public async verificaRetorno(login): Promise<Boolean> {

        let lista: Usuario[] = await this.repo.verificaRetorno(login)
        return lista.length > 0
    }

    async inserirUsuario(nome: string, email: string, login: string, senha: string) {
        if (!nome.trim()) {
            console.log('Informe o nome do usuário.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            console.log('Email inválido');
            return;
        }

        if (!/^.{3}$/.test(String(login).trim())) {
            console.log("O login deve conter exatamente 3 caracteres.");
            return;
        }

        const usuarioExiste = await this.verificaRetorno(login);
        if (usuarioExiste) {
            console.log('Login já cadastrado no sistema.');
            return;
        }

        if (!/^.{3}$/.test(String(senha).trim())) {
            console.log("A senha deve conter exatamente 3 caracteres.");
            return;
        }

        await this.repo.inserirUsuario(nome, email, login, senha);
        console.log('Usuário inserido com sucesso!');
    }

    public async exibirID(login): Promise<number[] | void> {

        if (!login.trim()) {
            console.log('Informe o login do usuário. ')
            return
        }
        const usuarioExiste = await this.verificaRetorno(login);
        if (!usuarioExiste) {
            console.log('Usuário não cadastado no sistema.');
            return;
        }

        return await this.repo.exibirID(login)
    }

    public async buscarInformacoes(login: string): Promise<Usuario[] | void> {

        if (!/^.{3}$/.test(String(login).trim())) {
            console.log("O login deve conter exatamente 3 caracteres.");
            return;
        }

        const usuarioExiste = await this.verificaRetorno(login);

        if (!usuarioExiste) {
            console.log('Login não cadastrado no sistema.');
            return;
        } else {
            console.table(await this.repo.buscarInformacoes(login))
        }
    }

    public async atualizarUsuario(login: string, coluna: string, registro: string): Promise<void> {

        const colunaValida = ['nome', 'email', 'login', 'senha']

        if (!/^.{3}$/.test(String(login).trim())) {
            console.log("O login deve conter exatamente 3 caracteres.");
            return;
        }

        const usuarioExiste = await this.verificaRetorno(login);

        if (!usuarioExiste) {
            console.log('Login não cadastrado no sistema.');
            return;
        } else {
            if (!colunaValida.includes(coluna)) {
                console.log("Coluna inválida ou não permitida!");
                return
            } else

                switch (coluna) {
                    case 'nome':
                        if (!registro.trim()) {
                            console.log('Informe o nome do usuário.');
                            return;
                        }
                        break

                    case 'email':
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registro)) {
                            console.log('Email inválido');
                            return;
                        }
                        break

                    case 'login':
                        if (!/^.{3}$/.test(String(registro).trim())) {
                            console.log("O login deve conter exatamente 3 caracteres.");
                            return;
                        }

                        const usuarioExiste = await this.verificaRetorno(registro);
                        if (usuarioExiste) {
                            console.log('Login já cadastrado no sistema.');
                            return;
                        }
                        break

                    case 'senha':
                        if (!/^.{3}$/.test(String(registro).trim())) {
                            console.log("A senha deve conter exatamente 3 caracteres.");
                            return;
                        }
                        break
                }
        }
        await this.repo.atualizarUsuario(login, coluna, registro);
        console.log('Usuário atualizado com sucesso')
    }

    public async deletarUsuario(login: string): Promise<void> {

        if (!/^.{3}$/.test(String(login).trim())) {
            console.log("O login deve conter exatamente 3 caracteres.");
            return;
        }

        const usuarioExiste = await this.verificaRetorno(login);

        if (!usuarioExiste) {
            console.log('Login não cadastrado no sistema.');
            return;
        }
        
        await this.repo.deletarUsuario(login)
        console.log('Usuário deletado com sucesso. ')
    }
}