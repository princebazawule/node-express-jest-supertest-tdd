const mongoose = require('mongoose')

const connect = async() => {
    try {
        await mongoose.connect(process.env.DB_CONN_STRING, {useUnifiedTopology: true, useNewUrlParser: true })
    } catch (err) {
        console.log('error connecting to mongodb')
        console.log(err)
    }
}

module.exports = { connect }