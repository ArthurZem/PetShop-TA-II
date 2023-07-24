import { Cliente } from "./Cliente";

export class Animal{
    id:number;
    nome: String;
    especie: String;
    raca: String;
    idade: number;
    dono: Cliente;

    constructor(id: number, nome: string, especie: string, raca: string, idade: number, dono:Cliente) {
        this.id = id;
        this.nome = nome;
        this.especie = especie;
        this.raca = raca;
        this.idade = idade;
        this.dono = dono;
    }

}

