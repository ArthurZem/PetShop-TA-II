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