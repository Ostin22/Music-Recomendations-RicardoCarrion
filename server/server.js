let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let cancionesRoutes = require('./routes/cancionesRoutes');
let app = express();
app.use(express.static('../client'));

let port = 3000;

async function connectDB() {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/musica', {useNewUrlParser: true, useUnifiedTopology: true});
    }catch(err){
        console.error("Error en la conexión a BDD", err)
        process.exit(1);
    }
};

connectDB();

app.use(cors());

app.use(express.json());

app.use('/canciones', cancionesRoutes);

app.listen(port, ()=> {
    console.log('Server is up')
});