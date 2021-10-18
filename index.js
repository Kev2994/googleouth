// JavaScript source code
const express = require('express');
const passport = require('passport');
const session = require('express-session');

require('./auth');

const app = express();
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIN = function (req, res, next) {
    req.user ? next() : res.sendStatus(401)
};

app.get('/', (req, res) => {
    res.send('<a href="/auth/google"> Authenticate with google</a>')
})


app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

app.get('/auth/google/redirect', isLoggedIN,
    passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    }));

app.get('/auth/google/success', (req, res) => {
    res.send('Hello Kevin')
});

app.get('/auth/google/failure', (req, res) => {
    res.send('Authentication failed')
});


app.listen(3000, () => console.log('listening on port 3000')); 