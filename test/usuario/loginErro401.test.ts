import { Request, Response } from "express";
import { UsuarioService } from "../../src/application/UsuarioService";
import { UsuarioController } from "../../src/controllers/UsuarioController";

describe("UsuarioController", () => {
  const mockUsuarioService: any = {
    criarUsuario: jest.fn().mockResolvedValue({ id: 1, login: "usuario", password: "hash123" }),
    login: jest.fn().mockResolvedValue("mocked-token")
  };

  const usuarioController = new UsuarioController(mockUsuarioService);

  it("deve retornar erro de credenciais inválidas ao realizar login", async () => {
    const mockRequest: Partial<Request> = {
      body: {
        login: "usuario",
        password: "senhaErrada",
      },
    };

    const mockResult: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockUsuarioService.login.mockResolvedValue(null);

    await usuarioController.login(mockRequest as Request, mockResult as Response);

    expect(mockUsuarioService.login).toHaveBeenCalledWith("usuario", "senhaErrada");

    expect(mockResult.status).toBeCalledWith(401);
    expect(mockResult.json).toHaveBeenCalledWith({ error: "Credenciais inválidas." });
  });
});
