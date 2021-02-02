const { io } = require('../../index');
const { userDisconnected, userConnected, storeMessage } = require('../contollers/socket');
const { valideToken } = require('../utils/jwt');


// Mensajes de Sockets
io.on('connection', client => {

    // console.log(client.handshake.headers)
    const [validatedToken, id] = valideToken(client.handshake.headers['token'])

    if (!validatedToken) {
        return client.disconnect()
    }

    console.log('Cliente conectado');

    userConnected(id)

    client.join(id)

    client.on('message', async (payload) => {
        const success = await storeMessage(payload)
        if (success)
            io.to(payload['to']).emit('message', payload);

    });

    // client.to(id).emit('')

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        userDisconnected(id)
    });



});
