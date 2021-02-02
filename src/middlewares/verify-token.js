const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const token = req.headers['token']

    if (!token)
        return res.status(403).json({
            success: false,
            error: "unauthorized"
        })

    try {
        const { payload } = jwt.verify(token, process.env.SEED)
        req.id = payload._id
        next()

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "unknow error"
        })

    }

}

module.exports = { validateToken }