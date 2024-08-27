const Videojuegos = require('../models/videojuegos.models');

// Obtener videojuegos con paginación
const obtenerVideojuegos = async (req, res) => {
    try {
        let pag = parseInt(req.query.pag) || 1;
        let limit = parseInt(req.query.limit) || 10; // Valor predeterminado de 10 videojuegos por página
        
        // Aseguramos que el límite sea entre 1 y 10
        limit = Math.min(Math.max(limit, 1), 10);
        
        // Aseguramos que la página sea al menos 1
        pag = !isNaN(pag) && pag > 0 ? pag : 1;

        const numVideojuegos = await Videojuegos.countDocuments();
        const numPage = Math.ceil(numVideojuegos / limit);

        // Ajustar si la página solicitada está fuera del rango
        if (pag > numPage) {
            pag = numPage;
        }

        const allVideojuegos = await Videojuegos.find()
            .skip((pag - 1) * limit)
            .limit(limit);

        // Combinamos la respuesta de la paginación con los datos de los videojuegos
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

// Obtener videojuego por ID
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
    try {
        const nuevoVideojuego = new Videojuegos({
            titulo,
            genero,
            plataforma,
            fechasalida,
            imagen,
            precio
        });
        const savedVideojuego = await nuevoVideojuego.save();
        res.status(201).json(savedVideojuego);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Actualizar un videojuego
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

// Eliminar un videojuego
const eliminarVideojuego = async (req, res) => {
    try {
        const videojuego = await Videojuegos.findById(req.params.id);
        if (!videojuego) return res.status(404).json({ message: "Videojuego no encontrado" });

        await videojuego.remove();
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
