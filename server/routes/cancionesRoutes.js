let express = require('express');
let router = express.Router();
let cancionController = require('../controller/cancionController');

router.get('/', (req, res)=>{
    res.status(200).send("Hola router");
});

router.post('/', cancionController.agregarCancion)

module.exports = router;