// import express from 'express';
import express, { Router } from 'express';
import { Cliente } from "../src/domain/Cliente";
import { Animal } from "../src/domain/Animal";


const app = express()
const route = Router();

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

// Criando instâncias de Cliente
const cliente1 = new Cliente(1, "João", "123456789", "Rua A");
const cliente2 = new Cliente(2, "Maria", "987654321", "Rua B");

// Criando instâncias de Animal e associando ao cliente
const animal1 = new Animal(1, "Rex", "Cachorro", "Labrador", 2, cliente1);
const animal2 = new Animal(2, "Mia", "Gato", "Persa", 1, cliente1);
const animal3 = new Animal(3, "Bolinha", "Cachorro", "Vira-lata", 3, cliente2);

// Adicionando animais à lista de animais do cliente
cliente1.animais.push(animal1, animal2);
cliente2.animais.push(animal3);

// Exibindo informações dos clientes e seus animais
console.log(cliente1);
console.log(cliente2);
