const { Router } = require('express');
const { getMessages } = require('../contollers/messages');
const { validateToken } = require('../middlewares/verify-token');

const router = Router()

router.post('/', [validateToken], getMessages)

module.exports = router