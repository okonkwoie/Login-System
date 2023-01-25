const express = require('express')
const blogModel = require('../models/blogs')

const blogRouter = express.Router()

blogRouter.get('/', (req, res) => {
    blogModel.find()
    .then(blogs => {
        res.send(blogs)
    })
    .catch(error => {
        res.send(error)
    })

})




module.exports = blogRouter