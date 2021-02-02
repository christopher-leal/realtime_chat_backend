const mongoose = require('mongoose');
// qQ2ylOMSPLLpG5NH
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('DB online')
    } catch (error) {
        console.log(error)
        throw new Error('Db Error')
    }
}

module.exports = { dbConnection }