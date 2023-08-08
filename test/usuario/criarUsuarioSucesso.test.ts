import { Request, Response } from "express";
import { UsuarioService } from "../../src/application/UsuarioService";
import { UsuarioController } from "../../src/controllers/UsuarioController";

describe("UsuarioController", () => {
  const mockUsuarioService: any = {
    criarUsuario: jest.fn().mockResolvedValue({ id: 1, login: "usuario", password: "hash123" }),
    login: jest.fn().mockResolvedValue("mocked-token")
  };

  const usuarioController = new UsuarioController(mockUsuarioService);

  it("deve criar um usuário com sucesso", async () => {
    const mockRequest: Partial<Request> = {
      body: {
        id: 1,
        login: "usuario",
        password: "password123",
      },
    };

    const mockResult: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await usuarioController.criarUsuario(mockRequest as Request, mockResult as Response);

    expect(mockUsuarioService.criarUsuario).toHaveBeenCalledWith(1, "usuario", "password123");

    expect(mockResult.status).toBeCalledWith(201);
    expect(mockResult.json).toHaveBeenCalledWith({ id: 1, login: "usuario", password: "hash123" });
  });

});
