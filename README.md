# Rest Server with NodeJS (Express)

Basic rest server configuation with NodeJS using Express framework.

*To use the project: clone the repository and run:*

```
npm install
npm start
```

- **index.js**
```

require('dotenv').config();
const Server = require('./models/server');

const server = new Server();

server.listen();

```

- **/models/server.js**
```

const express = require('express');
const cors = require('cors');
const router = require('../routes/users');

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT;

    // Routes paths
    this.usersPath = '/api/users';

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicacion
    this.routes();
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


```