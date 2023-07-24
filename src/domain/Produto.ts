export class Produto{
    id:number;
    nome: String;
    preco: String;
    estoque: number

    constructor(id: number, nome: string, preco: String, estoque: number) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

}

