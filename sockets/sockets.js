const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
// Mensajes del Socket
var clients = []
var bands = new Bands();
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Soda Stereo'));
bands.addBand(new Band('Rata Blanca'));
bands.addBand(new Band('Kraken'))
io.on('connection', client => {


    console.log("cliente conectado");
    client.emit('active-bands', bands.getBands() );
    client.on('disconnect', () => console.log("cliente desconectado ", client.id));
    client.on('message', (message) => io.emit("message", message));
    client.on('newMessage', (payload) =>io.emit("newMessage", payload));
    client.on('vote-band', (band)=> {
        bands.voteBand(band.id);
        io.emit('active-bands', bands.getBands() );
    });
    client.on('add-new', (band)=>{
        bands.addBand(new Band(band.name));
        io.emit('active-bands', bands.getBands() );
    });
    client.on('delete-band', (band)=>{
        bands.deleteBand(band.id);
        io.emit('active-bands', bands.getBands() );
    });

});
