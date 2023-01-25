const mongoose = require('mongoose')

// define a schema 
const Schema = mongoose.Schema

// define a user schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }, 

    author: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    tags: {
        type: [String]
    },

   timestamp: {
        type: Date,
        default: Date.now()
   },

    read_count: {
        type: Number,
        default: 0
    }, 

    reading_time: {
        type: String,
        default: " "
    },

    state: {
        type: String,
        default: 'draft',
        enum: ['draft', 'published']
    }
})

module.exports = mongoose.model('blog', blogSchema)