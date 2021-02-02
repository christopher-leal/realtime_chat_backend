const User = require("../models/User")

const getUsers = async (req, res) => {

    const from = Number(req.body.from) || 0
    const _users = await User.find({ _id: { $ne: req.id } }).sort('-online').skip(from).limit(20)
    // if (!user) return res.status(404).json({
    //     success: false,
    //     error: 'db error'
    // })
    return res.status(200).json({
        success: true,
        data: _users,
    })
}

module.exports = { getUsers }