const { Router } = require('express');
const { getUsers } = require('../contollers/users');
const { validateToken } = require('../middlewares/verify-token');

const router = Router()

router.post('/', [validateToken], getUsers)

module.exports = router