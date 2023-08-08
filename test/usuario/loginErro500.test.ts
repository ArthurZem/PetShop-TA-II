import { Request, Response } from "express";
import { UsuarioController } from "../../src/controllers/UsuarioController";

describe("UsuarioController", () => {
  const mockUsuarioService: any = {
    login: jest.fn(),
  };

  const usuarioController = new UsuarioController(mockUsuarioService);

  it("deve retornar erro 500 ao tentar realizar o login", async () => {
    const mockRequest: Partial<Request> = {
      body: {
        login: "usuario1",
        password: "senha123",
      },
    };

    const mockResult: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockUsuarioService.login.mockRejectedValue(new Error("Erro ao realizar login"));

    await usuarioController.login(mockRequest as Request, mockResult as Response);

    expect(mockUsuarioService.login).toHaveBeenCalledWith("usuario1", "senha123");
    expect(mockResult.status).toBeCalledWith(500);
    expect(mockResult.json).toHaveBeenCalledWith({ error: "Erro ao realizar login." });
  });
});
