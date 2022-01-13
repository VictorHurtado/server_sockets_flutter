const {io} = require('../index')
// Mensajes del Socket
io.on('connection', client => {
    console.log("cliente conectado")
    client.on('disconnect', () => {console.log("cliente desconectado")});
    client.on('message', (message) => {
        console.log("cliente emitio ",message['name']);
        io.emit("message",message);
        
    
    });
  });
