let Cancion = require('../models/cancion');

exports.agregarCancion = async (req, res) => {
    const {nombre, artista, url_video} = req.body;
    const cancion = new Cancion({nombre, artista, url_video});
    try{
        await cancion.save();
        res.status(201).json(cancion);
    }catch(error){
        console.error(error);
        res.status(400).json({message: 'Error al guardar cancion'})
    }
}