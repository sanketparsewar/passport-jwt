const User = require("../models/user");
const passport = require("passport");
require("dotenv").config();
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};

// ExtractJwt is use to extract the token from the complete token that includes the bearer
// this also valiadates the token correct or not
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log(jwt_payload);
    try {
      const user = await User.findOne({ id: jwt_payload.id });
    //   console.log('user',user)
      if (!user) {
        return done(null, {message: 'User not found'});
      } else {
        console.log('user',user)
        return done(null, user);
        
      }
    } catch (err) {
        return done(err, false);
    }
  })
);
