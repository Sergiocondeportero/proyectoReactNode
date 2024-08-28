const mongoose = require('mongoose');
const Cliente = require('../models/clientes.models');
const Videojuego = require('../models/videojuegos.models');
require('dotenv').config();

const arrayClientes = [
    {
        nombre: 'Juan Perez',
        email: 'juan.perez@example.com',
        telefono: '123456789',
        direccion: 'Calle Falsa 123, Ciudad X',
        password: 'password123',
        videojuegosComprados: [] // Se llenará más tarde
    },
    {
        nombre: 'Ana Gomez',
        email: 'ana.gomez@example.com',
        telefono: '987654321',
        direccion: 'Avenida Siempreviva 742, Ciudad Y',
        password: 'ana12345',
        videojuegosComprados: [] // Se llenará más tarde
    },
    {
        nombre: 'Carlos Diaz',
        email: 'carlos.diaz@example.com',
        telefono: '456789123',
        direccion: 'Boulevard Principal 456, Ciudad Z',
        password: 'carlos789',
        videojuegosComprados: [] // Se llenará más tarde
    },
    {
        nombre: 'Laura Torres',
        email: 'laura.torres@example.com',
        telefono: '654123987',
        direccion: 'Paseo del Parque 789, Ciudad W',
        password: 'laura456',
        videojuegosComprados: [] // Se llenará más tarde
    },
    {
        nombre: 'Marta Ruiz',
        email: 'marta.ruiz@example.com',
        telefono: '321654987',
        direccion: 'Plaza Mayor 321, Ciudad Q',
        password: 'marta321',
        videojuegosComprados: [] // Se llenará más tarde
    },
];

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Conectado a la base de datos");

        // Obtener todos los videojuegos
        const videojuegos = await Videojuego.find();

        // Asignar videojuegos a los clientes
        arrayClientes[0].videojuegosComprados.push(videojuegos[0]._id, videojuegos[1]._id); // Juan Perez compra The Legend of Zelda y God of War
        arrayClientes[1].videojuegosComprados.push(videojuegos[2]._id); // Ana Gomez compra The Witcher 3
        arrayClientes[2].videojuegosComprados.push(videojuegos[1]._id, videojuegos[3]._id); // Carlos Diaz compra God of War y Elden Ring
        arrayClientes[3].videojuegosComprados.push(videojuegos[4]._id); // Laura Torres compra Pokémon: Let's Go, Pikachu!
        arrayClientes[4].videojuegosComprados.push(videojuegos[0]._id, videojuegos[4]._id); // Marta Ruiz compra The Legend of Zelda y Pokémon: Let's Go, Pikachu!

        // Limpiar la colección de clientes
        const allClientes = await Cliente.find();
        if (allClientes.length !== 0) {
            await Cliente.collection.drop();
            console.log('Colección de clientes limpia');
        }

        // Insertar nuevos clientes
        const clientesDocs = arrayClientes.map(cliente => new Cliente(cliente));
        await Cliente.insertMany(clientesDocs);
        console.log('Clientes insertados con éxito');
    })
    .catch(err => console.error("Error al conectar o al insertar datos:", err))
    .finally(() => mongoose.disconnect());
