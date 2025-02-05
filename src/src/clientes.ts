export class Clientes {
 public nome: string
 public cpf: string
 public endereco: string
 public numero_residencial: number
 public bairro: string
 public cidade: string
 public uf: string
 public telefone: string
 public nascimento: Date

 constructor(nome:string, cpf:string, endereco:string, numero_residencial: number, bairro: string, cidade: string, uf: string, telefone: string, nascimento: Date){
    this.nome = nome
    this.cpf = cpf
    this.endereco = endereco
    this.numero_residencial = numero_residencial
    this.bairro = bairro
    this.cidade = cidade
    this.uf = uf
    this.telefone = telefone
    this.nascimento = nascimento
 }

}

//Clientes
//------------------------
//+ nome: string
//+ cpf: string
//+ endereco: string
//+ numero_residencial: number
//+ bairro: string
//+ cidade: string
//+ uf: string
//+ telefone: string
//+ nascimento: date
//----------------------------
//+ exibirClientes(): string
//+ cadastrarClientes(): string
//+ procurarClientes(): string
//+ procurarDistribuicoesClientes(): string
//+ atualizarClientes(): string
//+ deletarClientes(): string