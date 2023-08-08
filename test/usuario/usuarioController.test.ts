import { Request, Response } from "express";
import { UsuarioService } from "../../src/application/UsuarioService";
import { UsuarioController } from "../../src/controllers/UsuarioController";

describe("UsuarioController", () => {
  const mockUsuarioService: any = {
    criarUsuario: jest.fn().mockResolvedValue({ id: 1, login: "user1", password: "hash123" }),
    login: jest.fn().mockResolvedValue("mocked-token")
  };

  const usuarioController = new UsuarioController(mockUsuarioService);

  it("deve criar um usuário com sucesso", async () => {
    const mockRequest: Partial<Request> = {
      body: {
        id: 1,
        login: "user1",
        password: "password123",
      },
    };

    const mockResult: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await usuarioController.criarUsuario(mockRequest as Request, mockResult as Response);

    expect(mockUsuarioService.criarUsuario).toHaveBeenCalledWith(1, "user1", "password123");

    expect(mockResult.status).toBeCalledWith(201);
    expect(mockResult.json).toHaveBeenCalledWith({ id: 1, login: "user1", password: "hash123" });
  });

  it("deve realizar login com credenciais válidas", async () => {
    const mockRequest: Partial<Request> = {
      body: {
        login: "user1",
        password: "password123",
      },
    };

    const mockResult: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await usuarioController.login(mockRequest as Request, mockResult as Response);

    expect(mockUsuarioService.login).toHaveBeenCalledWith("user1", "password123");

    expect(mockResult.status).toBeCalledWith(200);
    expect(mockResult.json).toHaveBeenCalledWith({ token: "mocked-token" });
  });

  it("deve retornar erro de credenciais inválidas ao realizar login", async () => {
    const mockRequest: Partial<Request> = {
      body: {
        login: "user1",
        password: "wrong-password",
      },
    };

    const mockResult: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockUsuarioService.login.mockResolvedValue(null);

    await usuarioController.login(mockRequest as Request, mockResult as Response);

    expect(mockUsuarioService.login).toHaveBeenCalledWith("user1", "wrong-password");

    expect(mockResult.status).toBeCalledWith(401);
    expect(mockResult.json).toHaveBeenCalledWith({ error: "Credenciais inválidas." });
  });
});
