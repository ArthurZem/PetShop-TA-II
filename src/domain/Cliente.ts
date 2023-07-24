export class Cliente {
    id: number;
    nome: String;
    telefone: String;
    endereco: String;

    constructor(id:number,nome:String,telefone:String,endereco:String){
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
    }

}