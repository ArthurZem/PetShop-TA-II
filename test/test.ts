import { Animal } from '../src/models/Animal'

describe('Animal', () => {
  it('deve criar um animal com os atributos corretos', () => {
    const nome = 'Rex';
    const especie = 'Cachorro';
    const raca = 'Labrador';
    const idade = 3;

    const animal = new Animal(nome, especie, raca, idade);

    expect(animal.getNome()).toEqual(nome);
    expect(animal.getEspecie()).toEqual(especie);
    expect(animal.getRaca()).toEqual(raca);
    expect(animal.getIdade()).toEqual(idade);
  });
});
