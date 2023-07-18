import { Animal } from '../src/domain/Animal'
import { Cliente } from '../src/domain/Cliente';

describe('Animal', () => {
  it('deve criar um animal com os atributos corretos', () => {
    const id = 1;
    const nome = 'Rex';
    const especie = 'Cachorro';
    const raca = 'Labrador';
    const idade = 3;
    const dono = new Cliente(1, 'Leo', '123', 'Rua teste')

    const animal = new Animal(id, nome, especie, raca, idade, dono);

    expect(animal.id).toEqual(id);
    expect(animal.nome).toEqual(nome);
    expect(animal.espécie).toEqual(especie);
    expect(animal.raca).toEqual(raca);
    expect(animal.idade).toEqual(idade);
    expect(animal.dono).toEqual(dono)
  });
});
