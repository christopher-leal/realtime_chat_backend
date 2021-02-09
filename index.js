const express = require('express');
const path = require('path');
require('dotenv').config();
require('./src/config/db').dbConnection();
// App de Express
const app = express();

app.use(express.json())

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./src/sockets/socket');




// Path público
app.use(express.static(path.resolve(__dirname, 'public')));


app.use('/api/login', require('./src/routes/auth'))
app.use('/api/users', require('./src/routes/users'))
app.use('/api/messages', require('./src/routes/messages'))


server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);

});


