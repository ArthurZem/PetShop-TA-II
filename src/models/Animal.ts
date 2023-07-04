export class Animal {
    private nome: string;
    private especie: string;
    private raca: string;
    private idade: number;
  
    constructor(nome: string, especie: string, raca: string, idade: number) {
      this.nome = nome;
      this.especie = especie;
      this.raca = raca;
      this.idade = idade;
    }
  
    public getNome(): string {
      return this.nome;
    }
  
    public getEspecie(): string {
      return this.especie;
    }
  
    public getRaca(): string {
      return this.raca;
    }
  
    public getIdade(): number {
      return this.idade;
    }
  }
  