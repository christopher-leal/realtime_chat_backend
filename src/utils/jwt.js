const jwt = require('jsonwebtoken');

const getToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ payload }, process.env.SEED, { expiresIn: '8h' }, (err, token) => {
            if (err) return reject('problem creating token')
            resolve(token)
        })

    })
}

const valideToken = (token) => {

    if (!token)
        return [false]

    try {
        const { payload } = jwt.verify(token, process.env.SEED)
        return [true, payload._id];

    } catch (error) {
        return [false]

    }
}

module.exports = { getToken, valideToken }