const express = require('express');
const cors = require('cors');
const router = require('../routes/users');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT;

    // Routes paths
    this.usersPath = '/api/users';

    // Conectar a DB
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Read and body parse
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usersPath, router);
  }

  listen() {
    this.app.listen(this.PORT, () =>
      console.log(`App listening at http://localhost:${this.PORT}`),
    );
  }
}

module.exports = Server;
