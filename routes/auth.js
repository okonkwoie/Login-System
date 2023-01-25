const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authRouter = express.Router()

authRouter.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
        res.json({
            message: 'signup successful',
            user: req.user
        })
})

authRouter.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err){
                return next(err)
            }
            if (!user) {
                const error = new Error ('Username and Password incorrect')
                return next(error)
            }

            req.login(user, { session: false },
                async (error) => {
                    if (error){
                        return next(error)
                    }

                    const body = { _id: user._id, email: user.email } //store id and email in the jwt payload
                    const token = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '15m' }) //sign the token (encryption) with a secret and send back to the user

                    return res.json({ token })
                }
                
            )
        } 
        catch (error) {
            return next(error)
        }
    })

})




module.exports = authRouter