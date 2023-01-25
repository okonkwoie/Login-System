const passport = require('passport')
require('dotenv').config()

// passport strategy
const localStrategy = require('passport-local').Strategy
const userModel = require('../models/users')

// jwt strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt


// this middleware checks query paramater for 'secret token'
passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
        },

        async (token, done) => {
            try {
                return done(null, token.user)
            } 
            catch (error) {
                done(error)
            }
        }
    )
)

// signup middleware using passport
passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },

        async (email, password, done) => {
          try {
            const user = await userModel.create({ email, password })
            return done(null, user)
          } 
          catch (error) {
            done(error)
          }
        }
    )
)

// login middleware 
passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await userModel.findOne({ email })

                if (!user) {
                    return done (null, false, { message: 'user not found' })
                }
                
                const validate = await user.isValidPassword(password)

                if (!validate) {
                    return done (null, false, { message: 'wrong password' })
                }

                return done (null, user, { message: 'Logged in successfully' })

            } catch (error) {
                return done(error)
            }
        }
    )
)

module.exports = passport