export class Produto{
    id:number;
    nome: String;
    preco: number;
    estoque: number

    constructor(id: number, nome: string, preco: number, estoque: number) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

}

