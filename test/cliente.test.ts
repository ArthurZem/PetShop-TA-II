import { Cliente } from "../src/domain/Cliente";
import { ClienteRepository } from '../src/repositories/ClienteRepository'
import { ClienteService } from '../src/application/ClienteService'
import {ClienteController} from '../src/controllers/ClienteController'
import { Request, Response } from "express";

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

    describe('ClienteRepository' , ()=>{
        let clienteRepository:ClienteRepository;

        beforeEach(()=>{
            clienteRepository = new ClienteRepository();
        })
        it('deve salvar um cliente corretamente', async () => {
            const cliente = new Cliente(1, 'João', '123456789', 'Rua A');
            
            await clienteRepository.save(cliente);

            const resultado = await clienteRepository.findById(1)

            expect(resultado).toEqual(cliente);
        })
        it('deve excluir um cliente', async () => {
            const cliente = new Cliente(1, 'João', '123456789', 'Rua A');
            await clienteRepository.save(cliente);
            await clienteRepository.delete(cliente);

            const resultado = await clienteRepository.findById(1);

            expect(resultado).toBeNull();
        })
        it('deve retornar clientes com o mesmo nome', async ()=>{
            const cliente1 = new Cliente(1, 'João', '123456789', 'Rua A');
            const cliente2 = new Cliente(2, 'João', '987654321', 'Rua B');
            const cliente3 = new Cliente(3, 'Maria', '111111111', 'Rua C');
            await clienteRepository.save(cliente1);
            await clienteRepository.save(cliente2);
            await clienteRepository.save(cliente3);

            const resultado = await clienteRepository.findByNome('João');

            expect(resultado).toEqual([cliente1,cliente2]);
        })
    });
    describe('ClienteController', ()=>{
        let clienteController: ClienteController;
        let clienteService: ClienteService;

        beforeEach(()=>{
            const clienteRepository = new ClienteRepository()
            clienteService = new ClienteService(clienteRepository);
            clienteController = new ClienteController(clienteService);
            
            it('deve retornar o cliente pelo ID', async () => {
                const clienteId = 1;
                const clienteMock = new Cliente(clienteId, 'João', '123456789', 'Rua A');
            
                // Simule o método findById do clienteService para retornar o clienteMock
                jest.spyOn(clienteService, 'findById').mockResolvedValueOnce(clienteMock);
            
                // Crie os objetos req e res simulados
                const req: Request = { params: { id: clienteId } } as unknown as Request;
                const res: Response = {
                  json: jest.fn().mockReturnThis(),
                  status: jest.fn().mockReturnThis(),
                } as unknown as Response;
            
                // Chame o método findById do clienteController
                await clienteController.findById(req, res);
            
                // Verifique se o método findById do clienteService foi chamado com o ID correto
                expect(clienteService.findById).toHaveBeenCalledWith(clienteId);
            
                // Verifique se a resposta da requisição foi enviada com o cliente correto
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(clienteMock);
              });
        })
    })
});