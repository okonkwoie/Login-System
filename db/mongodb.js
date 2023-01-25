const mongoose = require('mongoose')
const config = require('../config/config')

function mongodbConnect(){
    mongoose.connect (config.MONGODB_URL)

    mongoose.connection.on('connected', () => {
        console.log('mongodb connected successfully!...');
    })

    mongoose.connection.on('error', (error) => {
        console.log('connection unsuccessful...');
        console.log(error);
    })
}

module.exports = mongodbConnect

