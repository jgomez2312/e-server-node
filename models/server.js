const express = require('express');
const cors = require('cors');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios';

        // Middelwares
        this.middelwares();

        // Rutas de la aplicacion
        this.routes();
    }

    middelwares() {

        // Utilizacion del cors
        this.app.use(cors());

        // lectura y parseo del body
        this.app.use(express.json());

        // Directorio Publico
        this.app.use(express.static('public'));

    }

    routes() {

        this.app.use(this.usuariosRoutePath, require('../routes/usuarios'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`HRC+ es corriendo en http://localhost/${this.port}`);
        });
    }

}

module.exports = {
    Server
};