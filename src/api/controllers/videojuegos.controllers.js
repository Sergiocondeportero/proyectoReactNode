const Videojuegos = require('../models/videojuegos.models');

// Obtener videojuegos con paginación
const obtenerVideojuegos = async (req, res) => {
    try {
      
        let pag = parseInt(req.query.pag) || 1;

        pag = !isNaN(pag) && pag > 0 ? pag : 1;

       
        const numVideojuegos = await Videojuegos.countDocuments();
        
       
        const allVideojuegos = await Videojuegos.find();

   
        const numPage = Math.ceil(numVideojuegos / 10);

        res.status(200).json({
            previewPage: pag > 1 ? pag - 1 : null,
            page: pag,
            nextPage: numPage > pag ? pag + 1 : null,
            videojuegos: allVideojuegos,
            quantityPage: allVideojuegos.length
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const obtenerVideojuegoPorId = async (req, res) => {
    try {
        const videojuego = await Videojuegos.findById(req.params.id);
        if (!videojuego) return res.status(404).json({ message: "Videojuego no encontrado" });
        res.status(200).json(videojuego);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo videojuego
const crearVideojuego = async (req, res) => {
    const { titulo, genero, plataforma, fechasalida, imagen, precio } = req.body;

    // Imprimir el cuerpo de la solicitud para verificar los datos recibidos
    console.log('Datos recibidos:', req.body);

    try {
        const nuevoVideojuego = new Videojuegos({
            titulo: titulo || null,
            genero: genero || null,
            plataforma: plataforma || null,
            fechasalida: fechasalida ? new Date(fechasalida) : null,
            imagen: imagen || null,
            precio: precio || null
        });

        const savedVideojuego = await nuevoVideojuego.save();
        console.log('Videojuego guardado:', savedVideojuego); 

        res.status(201).json(savedVideojuego);
    } catch (err) {
        console.error('Error al crear el videojuego:', err); 
        res.status(400).json({ message: err.message });
    }
};


const actualizarVideojuego = async (req, res) => {
    const { titulo, genero, plataforma, fechasalida, imagen, precio } = req.body;
    try {
        const videojuego = await Videojuegos.findById(req.params.id);
        if (!videojuego) return res.status(404).json({ message: "Videojuego no encontrado" });

        videojuego.titulo = titulo || videojuego.titulo;
        videojuego.genero = genero || videojuego.genero;
        videojuego.plataforma = plataforma || videojuego.plataforma;
        videojuego.fechasalida = fechasalida || videojuego.fechasalida;
        videojuego.imagen = imagen || videojuego.imagen;
        videojuego.precio = precio || videojuego.precio;

        const updatedVideojuego = await videojuego.save();
        res.status(200).json(updatedVideojuego);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const eliminarVideojuego = async (req, res) => {
    try {
        const videojuego = await Videojuegos.findById(req.params.id);
        
        if (!videojuego) {
            return res.status(404).json({ message: "Videojuego no encontrado" });
        }

        await Videojuegos.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Videojuego eliminado" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    obtenerVideojuegos,
    obtenerVideojuegoPorId,
    crearVideojuego,
    actualizarVideojuego,
    eliminarVideojuego
};