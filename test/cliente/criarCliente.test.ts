import { Cliente } from "../../src/domain/Cliente";

describe('Cliente', ()=> {
    it('deve criar um cliente com os atributos corretos', ()=>{
        const id = 1;
        const nome = 'João'
        const telefone = '123456789';
        const endereco = 'Rua teste';

        const cliente = new Cliente(id, nome, telefone, endereco);

        expect(cliente.id).toEqual(id);
        expect(cliente.nome).toEqual(nome);
        expect(cliente.telefone).toEqual(telefone);
        expect(cliente.endereco).toEqual(endereco);
    });

})