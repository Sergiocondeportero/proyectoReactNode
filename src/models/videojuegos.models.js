const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videojuegosSchema = new Schema({
    titulo: { type: String, required: true },  
    genero: { type: String, required: false },   
    plataforma: { type: String, required: false }, 
    fechasalida: { type: Date, required: false }, 
    imagen: { type: String, required: false },    
    precio: { type: Number, required: false },  
},
    {
        collection:"videojuegos",
        timestamps: true
    }
);

const videojuegos = mongoose.model('videojuegos', videojuegosSchema);

module.exports = videojuegos;
