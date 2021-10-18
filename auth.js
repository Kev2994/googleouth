// JavaScript source code
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const dotenv = require('dotenv');

dotenv.config();
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/redirect",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
));

passport.serializeUser(function (user, done) {
    done(null, user)
});

passport.deserializeUser(function (user, done) {
    done(null, user)
});