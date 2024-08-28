const express = require('express');
const { connectDB } = require('./src/utils/db');
const routerVideojuegos = require('./src/api/routes/videojuegos.routes'); 
const routerClientes = require('./src/api/routes/clientes.routes');
const env = require('dotenv');
env.config();

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
const cors =require("cors");
connectDB();
const server = express();
const PORT = process.env.PORT || 3000;
server.use(cors());
server.use(express.json());

server.use('/videojuegos', routerVideojuegos); 
server.use('/clientes', routerClientes); 

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
