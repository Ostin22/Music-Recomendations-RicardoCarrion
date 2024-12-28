let Cancion = require('../models/cancion');

exports.agregarCancion = async (req, res) => {
    console.log("REQUEST RECIBIDA "+req.body);
    const {nombre, artista, url_video} = req.body;
    const cancion = new Cancion({nombre, artista, url_video});
    try{
        await cancion.save();
        console.log("CANCION GUARDADA "+cancion);

        res.status(201).json(cancion);
    }catch(error){
        console.error(error);
        res.status(400).json({message: 'Error al guardar cancion'})
    }
}

//aggreagate devuelve un arreglo con un sample aleatorio 
exports.randomSong = async(req, res) =>{
    let randomSong = await Cancion.aggregate(
    [{ $sample: { size: 1 }}]);
    try {
        if(randomSong.length > 0){
            return res.status(200).json(randomSong);
        }
        res.status(404).json({message: "No se han encontrado canciones en la base de datos"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "ocurrio un error al procesar tu solicitud"});
    };
};

//Funcion para obtener la lista de canciones
exports.getAllSongs = async(req, res) =>{
    try {
        const canciones = await Cancion.find();
        res.status(200).json(canciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al obtener lista de canciones"})
    }
};
//Funcion para obtener una cancion por su id
exports.getSongById = async(req, res) =>{
    const {id} = req.params;
    try {
        const cancion = await Cancion.findById(id);
        if(!cancion){
            return res.status(404).json({message: "cancion no encontrada"})
        }
        res.status(200).json(cancion);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error"})
    }
};


//funcion para votar por una cancion con su id

exports.voteSong = async (req, res) => {
    const { id } = req.params; // Obtener el ID desde la URL
    try {
        // Buscar la canción por ID
        const cancion = await Cancion.findById(id);

        // Verificar si existe la canción
        if (!cancion) {
            return res.status(404).json({ message: "Canción no encontrada" });
        }

        // Incrementar los votos
        cancion.votes += 1;

        // Guardar los cambios
        await cancion.save();

        // Devolver la canción actualizada
        res.status(200).json(cancion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar los votos" });
    }
};
