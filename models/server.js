const express = require('express');
const http = require('http');
const socketio =  require('socket.io')
const path = require('path');
const Sockets = require('./sockets');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer(this.app);

        //Configuración de sockets 
        this.io = socketio(this.server, {/* configuraciones */});
    }

    middlewares() {
        //Desplegar directorio público
        this.app.use( express.static( path.resolve(__dirname,'../public')));
    }

    configurarSockets() {
        new Sockets( this.io);
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        //Configurar sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen(this.port, () =>{
            console.log("Server corriendo en el puerto :", this.port);
        });
    }
}

module.exports = Server;