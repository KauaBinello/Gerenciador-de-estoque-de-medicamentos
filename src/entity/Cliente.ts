export class Cliente {
     
     private id: number
     private nome: string
     private cpf: string
     private endereco: string
     private numero_residencial: string
     private bairro: string
     private cidade: string
     private uf: string
     private telefone: string
     private nascimento: Date

     constructor(id: number, nome: string, cpf: string, endereco: string, numero_residencial: string, bairro: string, cidade: string, uf: string, telefone: string, nascimento: Date) {
          this.id = id
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
