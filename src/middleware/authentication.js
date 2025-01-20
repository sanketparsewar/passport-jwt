const passport = require('passport')
const jwt=require('passport-jwt').Strategy


passport.use(jwt.Strategy())