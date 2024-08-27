const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videojuegosSchema = new Schema({
    titulo: { type: String, required: true },
    genero: { type: String, required: true },
    plataforma: { type: String, required: true },
    fechasalida: { type: Date, required: true },
    imagen: { type: String, required: true },
    precio: { type: Number, required: true },
},
    {
        collection:"videojuegos",
        timestamps: true
    }
);

const videojuegos = mongoose.model('videojuegos', videojuegosSchema);

module.exports = videojuegos;
