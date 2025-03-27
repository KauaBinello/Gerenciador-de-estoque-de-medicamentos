import { Pool } from "pg"

// Configuração do banco de dados
export class Database {
    static pool: Pool

    static iniciarConexao(): Pool {
        this.pool = new Pool({
            user: 'postgres',       // Substitua pelo seu usuário
            host: 'localhost',         // Host do PostgreSQL
            database: 'ProjetoIntegrador',   // Nome do banco de dados
            password: '4292',     // Substitua pela sua senha
            port: 5432
        })
        return this.pool
    }
}