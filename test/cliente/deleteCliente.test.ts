import { ClienteController } from "../../src/controllers/ClienteController";
import { Cliente } from "../../src/domain/Cliente";
import { Request, Response } from "express";

describe("ClienteController", () => {
    let mockClienteService: any;
    let clienteController: ClienteController;

    beforeEach(() => {
        mockClienteService = {
            findById: jest.fn().mockResolvedValue(undefined),
            delete: jest.fn().mockResolvedValue(undefined),
        };
        clienteController = new ClienteController(mockClienteService);
    });

    describe("delete", () => {
        it("deve deletar o Cliente com sucesso", async () => {
            const ClienteId = 1;

            const mockCliente: Cliente = new Cliente(1, "Teste","(99)99999-9999", "Rua teste",);
            mockClienteService.findById.mockResolvedValue(mockCliente);

            const mockRequest: Partial<Request> = {
                params: {
                    id: String(ClienteId),
                },
            };

            const mockResponse: Partial<Response> = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            await clienteController.delete(mockRequest as Request, mockResponse as Response);

            expect(mockClienteService.findById).toHaveBeenCalledWith(ClienteId);

            expect(mockResponse.status).toHaveBeenCalledWith(204);
            expect(mockResponse.send).toHaveBeenCalled();
        });
        });

        it("deve retornar um erro 404 se o Cliente não for encontrado", async () => {
            const ClienteId = 1;

            mockClienteService.findById.mockResolvedValue(undefined);

            const mockRequest: Partial<Request> = {
                params: {
                    id: String(ClienteId),
                },
            };

            const mockResponse: Partial<Response> = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await clienteController.delete(mockRequest as Request, mockResponse as Response);

            expect(mockClienteService.findById).toHaveBeenCalledWith(ClienteId);

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: "Cliente não encontrado." });
        });

        it("deve retornar um erro 500 se ocorrer um erro ao tentar deletar o Cliente", async () => {
            const ClienteId = 1;

            mockClienteService.findById.mockResolvedValue(new Cliente(1, "Teste","(99)99999-9999", "Rua teste"));
            mockClienteService.delete.mockRejectedValue(new Error("Erro ao tentar deletar o Cliente."));

            const mockRequest: Partial<Request> = {
                params: {
                    id: String(ClienteId),
                },
            };

            const mockResponse: Partial<Response> = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await clienteController.delete(mockRequest as Request, mockResponse as Response);

            expect(mockClienteService.findById).toHaveBeenCalledWith(ClienteId);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: "Erro ao tentar deletar o Cliente." });
        });
    });