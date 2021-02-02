const User = require("../models/User")
const bcrypt = require('bcryptjs');
const { getToken } = require("../utils/jwt");

const login = async (req, res) => {
    const { email, password } = req.body

    const _user = await User.findOne({ email })
    if (!_user) return res.status(404).json({ succes: false, error: "User not found" })

    const comparedPassword = await bcrypt.compare(password, _user.password)
    if (!comparedPassword)
        return res.status(400).json({ succes: false, error: "User or password invalid" })
    return res.json({
        success: true,
        token: await getToken(_user),
        data: _user
    })
}

const setUser = async (req, res) => {

    const { email } = req.body

    const _user = await User.findOne({ email })

    if (_user) return res.json({ succes: false, error: "User registered" })

    const user = new User(req.body)
    const salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    const token = await getToken(user)
    res.json({
        data: user,
        token,
        success: true,
        error: null
    })

}

const refreshToken = async (req, res) => {


    const _user = await User.findOne({ _id: req.id })
    if (!_user) return res.json({ succes: false, error: "User not found" })


    return res.json({
        success: true,
        token: await getToken(_user),
        data: _user
    })

}



module.exports = {
    login,
    refreshToken,
    setUser
}