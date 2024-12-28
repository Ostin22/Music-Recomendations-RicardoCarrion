let express = require('express');
let router = express.Router();
let cancionController = require('../controller/cancionController');

router.get('/', (req, res)=>{
    res.status(200).send("Hola router");
});


//Llamar al controlador que genera la cancion aleatoria
router.get('/randomsong', cancionController.randomSong)

router.post('/', cancionController.agregarCancion)



//Obtener lista de canciones
router.get('/todas', cancionController.getAllSongs);
//ruta para actualizar los votos usando patch
router.patch('/:id/votar', cancionController.voteSong);

module.exports = router;
