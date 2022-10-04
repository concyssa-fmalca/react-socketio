//Servidor de Express
const express = require('express');
const app = express();

//Servidor de sockets
const server = require('http').createServer(app);

//Configuración del socket server
const io = require('socket.io')(server);

//Desplegar directorio público
app.use( express.static(__dirname + '/public'));

//Escuchar peticiones del cliente (socket)
io.on('connection',( socket ) =>{
    socket.on('message-to-server', (data) => {
        console.log(data);
        io.emit('message-from-server',data);
    })
})

server.listen(8080, () =>{
    console.log("Server corriendo en el puerto : 8080");
});


