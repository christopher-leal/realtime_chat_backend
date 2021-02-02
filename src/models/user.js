const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        default: false
    },

})

UserSchema.method('toJSON', function () {
    const { __v, password, ...obj } = this.toObject()
    return obj;
})

module.exports = model('User', UserSchema)