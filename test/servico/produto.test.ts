import { ServicoService } from "../../src/application/ServicoService";
import { ServicoController } from "../../src/controllers/ServicoController";
import {ServicoRepository} from "../../src/repositories/ServicoRepository";
import { Servico } from "../../src/domain/Servico";

describe('Servico', () => {
  describe('Servico Model', () => {
    it('deve criar um Servico com os atributos corretos', () => {
      const id = 1;
      const nome = 'Ração para Cães';
      const preco = "R$50.99";

      const servico = new Servico(id, nome, preco);

      expect(servico.id).toEqual(id);
      expect(servico.nome).toEqual(nome);
      expect(servico.preco).toEqual(preco);
    });
  });
});
