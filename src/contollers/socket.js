const User = require("../models/User")
const Message = require('../models/message');

const userConnected = async (id = '') => {
    const _user = await User.findById(id)
    _user.online = true
    await _user.save()
    return _user
}

const userDisconnected = async (id = '') => {
    const _user = await User.findById(id)
    _user.online = false
    await _user.save()
    return _user
}

const storeMessage = async (message) => {
    try {
        const newMessage = new Message(message)
        await newMessage.save()

        return true;

    } catch (error) {
        return false;
    }
}

module.exports = { userConnected, userDisconnected, storeMessage }