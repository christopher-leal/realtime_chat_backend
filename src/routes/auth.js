const { Router } = require('express');
const { check } = require('express-validator');
const { setUser, login, refreshToken } = require('../contollers/auth');
const { checkName } = require('../middlewares/check-field');
const { validateToken } = require('../middlewares/verify-token');

const router = Router()

router.post('/', [check('email', 'the email is required').isEmail(), check('password', 'the password is required').not().isEmpty(), checkName], login)
router.get('/refresh', [validateToken], refreshToken)
router.post('/new', [check('name', 'the name is required').not().isEmpty(), check('email', 'the email is required').isEmail(), check('password', 'the password is required').not().isEmpty(), checkName], setUser)

module.exports = router