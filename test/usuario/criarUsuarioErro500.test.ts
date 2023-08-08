import { Request, Response } from "express";
import { UsuarioController } from "../../src/controllers/UsuarioController";

describe("UsuarioController", () => {
  const mockUsuarioService: any = {
    criarUsuario: jest.fn(),
  };

  const usuarioController = new UsuarioController(mockUsuarioService);

  it("deve retornar erro 500 ao tentar criar um usuário", async () => {
    const mockRequest: Partial<Request> = {
      body: {
        id: 1,
        login: "usuario1",
        password: "senha123",
      },
    };

    const mockResult: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockUsuarioService.criarUsuario.mockRejectedValue(new Error("Erro ao criar usuário"));

    await usuarioController.criarUsuario(mockRequest as Request, mockResult as Response);

    expect(mockUsuarioService.criarUsuario).toHaveBeenCalledWith(1, "usuario1", "senha123");
    expect(mockResult.status).toBeCalledWith(500);
    expect(mockResult.json).toHaveBeenCalledWith({ error: "Erro ao criar Usuário." });
  });
});
