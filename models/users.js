const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// define a schema 
const Schema = mongoose.Schema

// define a author schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
})

// this pre-hooks or presave hashes password and stores in database
userSchema.pre(
    'save',
    async function (next) {
        const user = this
        const hash = await bcrypt.hash(this.password, 10)

        this.password = hash
        next()
    }
)

// verify the user trying to log in if user has valid credentials
userSchema.methods.isValidPassword = async function(password) {
    const user = this
    const compare = await bcrypt.compare(password, user.password)

    return compare
}

module.exports = mongoose.model('user', userSchema)