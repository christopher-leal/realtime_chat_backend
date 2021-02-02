const Message = require("../models/message")

const getMessages = async (req, res) => {

    const myId = req.id;
    const from = Number(req.body.from) || 0
    const _messages = await Message.find({ $or: [{ from: myId, to: req.body.messageTo }, { from: req.body.messageTo, to: myId }] }).sort({ createdAt: 'desc' }).skip(from).limit(20)
    // if (!user) return res.status(404).json({
    //     success: false,
    //     error: 'db error'
    // })
    return res.status(200).json({
        success: true,
        data: _messages,
    })
}

module.exports = { getMessages }