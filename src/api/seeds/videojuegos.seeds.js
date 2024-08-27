const mongoose = require('mongoose');
const Videojuegos = require('../models/videojuegos.models');  
require("dotenv").config();

const arrayVideojuegos = [
    {
        titulo: 'The Legend of Zelda: Breath of the Wild',
        genero: 'Action-Adventure',
        plataforma: 'Nintendo Switch',
        fechasalida: new Date('2017-03-03'),
        imagen: 'https://res.cloudinary.com/drflqypoq/image/upload/v1724660168/zelda_vcn2yp.jpg',
        precio: 59.99,
    },
    {
        titulo: 'God of War',
        genero: 'Action',
        plataforma: 'PlayStation 4',
        fechasalida: new Date('2018-04-20'),
        imagen: 'https://res.cloudinary.com/drflqypoq/image/upload/v1724660167/god_of_war_dbc1xr.jpg',
        precio: 49.99,
    },
    {
        titulo: 'The Witcher 3: Wild Hunt',
        genero: 'RPG',
        plataforma: 'PC, PlayStation 4, Xbox One',
        fechasalida: new Date('2015-05-19'),
        imagen: 'https://res.cloudinary.com/drflqypoq/image/upload/v1724660168/thewithcer3_wwxljk.jpg',
        precio: 39.99,
    },
    {
        titulo: 'Elden Ring',
        genero: 'Action RPG',
        plataforma: 'PC, PlayStation 5, Xbox Series X',
        fechasalida: new Date('2022-02-25'),
        imagen: 'https://res.cloudinary.com/drflqypoq/image/upload/v1724660167/eldenring_uuea9g.jpg',
        precio: 59.99,
    },
    {
        titulo: "Pokémon: Let's Go, Pikachu!",
        genero: 'RPG',
        plataforma: 'Nintendo Switch',
        fechasalida: new Date('2018-11-16'),
        imagen: 'https://res.cloudinary.com/drflqypoq/image/upload/v1724660168/lestgopikachu_vgzd3n.jpg',
        precio: 49.99,
    },
    {
        titulo: 'Cyberpunk 2077',
        genero: 'Action RPG',
        plataforma: 'PC, PlayStation 4, Xbox One',
        fechasalida: new Date('2020-12-10'),
        imagen: 'https://res.cloudinary.com/drflqypoq/image/upload/v1724660168/ciberpunk2077_itqvma.jpg',
        precio: 59.99,
    },
    {
        titulo: 'Horizon Zero Dawn',
        genero: 'Action RPG',
        plataforma: 'PlayStation 4, PC',
        fechasalida: new Date('2017-02-28'),
        imagen: 'https://res.cloudinary.com/drflqypoq/image/upload/v1724660167/horizonzerodawn_bsuqgy.jpg',
        precio: 49.99,
    },
    {
        titulo: 'Red Dead Redemption 2',
        genero: 'Action-Adventure',
        plataforma: 'PlayStation 4, Xbox One, PC',
        fechasalida: new Date('2018-10-26'),
        imagen: 'https://res.cloudinary.com/drflqypoq/image/upload/v1724660167/red-dead-redemption-2_acfkcn.jpg',
        precio: 59.99,
    },
    {
        titulo: 'Super Mario Odyssey',
        genero: 'Platform',
        plataforma: 'Nintendo Switch',
        fechasalida: new Date('2017-10-27'),
        imagen: 'https://res.cloudinary.com/drflqypoq/image/upload/v1724660167/supermarioodyssey_or3sho.jpg',
        precio: 59.99,
    },
    {
        titulo: 'Final Fantasy VII Remake',
        genero: 'RPG',
        plataforma: 'PlayStation 4',
        fechasalida: new Date('2020-04-10'),
        imagen: 'https://res.cloudinary.com/drflqypoq/image/upload/v1724660167/finalfantasy7remake_qpkazk.jpg',
        precio: 59.99,
    },
];

mongoose.connect(process.env.DB_URL)
    .then(async () => {
        console.log("se ha conectado")
        const allVideojuegos = await Videojuegos.find();
        if (allVideojuegos.length !== 0) {
            await Videojuegos.collection.drop();
            console.log('Base de datos limpia');
        }
    })
    .catch((err) => { console.log("Error al borrar la colección: ", err); })
    .then(async () => {
        const videojuegosDocs = arrayVideojuegos.map((eachVideojuego) => new Videojuegos(eachVideojuego));
        await Videojuegos.insertMany(videojuegosDocs);
        console.log('Datos insertados con éxito');
    })
    .catch((err) => { console.log("Error al insertar los datos: ", err); })
    .finally(() => mongoose.disconnect());