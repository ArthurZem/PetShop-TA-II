import { Cliente } from "./Cliente";

export class Animal{
    id:number;
    nome: String;
    espécie: String;
    raca: String;
    idade: number;
    dono: Cliente;

    constructor(id: number, nome: string, espécie: string, raca: string, idade: number, dono:Cliente) {
        this.id = id;
        this.nome = nome;
        this.espécie = espécie;
        this.raca = raca;
        this.idade = idade;
        this.dono = dono;
    }

}

