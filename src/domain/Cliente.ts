import { Animal } from "./Animal";

export class Cliente {
    id: number;
    nome: String;
    telefone: String;
    endereco: String;
    animais: Animal[]

    constructor(id:number,nome:String,telefone:String,endereco:String){
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.animais = [];
    }

}