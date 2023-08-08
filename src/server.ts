// import express from 'express';
import express, { Router } from 'express';
import { Cliente } from "../src/domain/Cliente";
import { Animal } from "../src/domain/Animal";
import { loggerMiddleware } from './middleware/loggerMiddleware';
import { AnimalService } from './application/AnimalService';
import { AnimalRepository } from './repositories/AnimalRepository';
import { AnimalController } from './controllers/AnimalController';
import { ClienteRepository } from './repositories/ClienteRepository';
import { ClienteService } from './application/ClienteService';
import { ClienteController } from './controllers/ClienteController';
import { ServicoRepository } from './repositories/ServicoRepository';
import { ServicoService } from './application/ServicoService';
import { ServicoController } from './controllers/ServicoController';
import { Servico } from './domain/Servico';
import { ProdutoService } from './application/ProdutoService';
import { ProdutoController } from './controllers/ProdutoController';
import { ProdutoRepository } from './repositories/ProdutoRepository';
import { UsuarioService } from './application/UsuarioService';
import { UsuarioRepository } from './repositories/UsuarioRepository';
import { UsuarioController } from './controllers/UsuarioController';

const app = express()
const route = Router();
app.use(loggerMiddleware);

route.get('/api/ola/:info', () => { console.log('ola') });

route.get('/', (request, response) => {
    return response.json({ message: 'Hello World' });
});

app.use(express.json());
app.use(route);

app.listen(3333, () => {
    console.log('Server started on port 3333!');
});

console.log("oi, denovo");

// Rotas de animal
const animalRepository = new AnimalRepository()
const animalService = new AnimalService(animalRepository);
const animalController = new AnimalController(animalService);
app.post('/animais',animalController.CriarAnimal.bind(animalController));
app.get('/animais/:id',animalController.findById.bind(animalController));
app.delete('/animais:/id',animalController.delete.bind(animalController));
app.get('/animais/:especie',animalController.findByEspecie.bind(animalController));

// Rotas de cliente
const clienteRepository = new ClienteRepository();
const clienteService = new ClienteService(clienteRepository);
const clienteController = new ClienteController(clienteService);
app.post('/clientes',clienteController.criarCliente.bind(clienteController));
app.get('/clientes/:id',clienteController.findById.bind(clienteController));
app.delete('/clientes:/id',clienteController.delete.bind(clienteController));
app.get('/clientes/:animal',clienteController.getAnimaisDoCliente.bind(clienteController));

// rotas de serviços

const servicoRepository = new ServicoRepository();
const servicoService = new ServicoService(servicoRepository);
const servicoController = new ServicoController(servicoService);
app.post('/servicos',servicoController.criarServico.bind(servicoController));
app.get('/servicos/:id',servicoController.findById.bind(servicoController));
app.delete('/servicos:/id',servicoController.delete.bind(servicoController));
app.get('/servicos',servicoController.listarServicos.bind(servicoController));

//rotas de produto

const produtoRepository = new ProdutoRepository();
const produtoService = new ProdutoService(produtoRepository);
const produtoController = new ProdutoController(produtoService);
app.post('/produtos',produtoController.criarProduto.bind(produtoController));
app.get('/produtos/:id',produtoController.findById.bind(produtoController));
app.delete('/produtos:/id',produtoController.delete.bind(produtoController));
app.get('/produtos',produtoController.listarProdutos.bind(produtoController));

// rotas de usuário

const usuarioRepository = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);
const usuarioController = new UsuarioController(usuarioService);
app.post('/produtos',usuarioController.criarUsuario.bind(usuarioController));
app.get('/login',usuarioController.login.bind(usuarioController));