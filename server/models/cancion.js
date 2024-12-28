let mongoose = require('mongoose');

let cancionSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    artista: {type: String, required: true},
    url_video: {type: String, required: true},
    votes: {type: Number, default: 0}
});

let Cancion = mongoose.model('Cancion', cancionSchema);

module.exports = Cancion;