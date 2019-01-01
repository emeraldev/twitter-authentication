const cookieSession = require('cookie-session');
const express = require('express');
const app = express()
const port = 4000
const passport = require('passport');
const passportSetup = require('./config/passport-setup')
const session = require('express-session')
const authRoutes = require('./routes/auth-routes');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// set up view engine
app.set('view engine', 'ejs');

// connect to mongodb
mongoose.connect(keys.MONGODB_URI, () => {
    console.log('connected to mongo db')
});

// // set up routes
// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true
// }));

app.use(cookieSession({
    name: 'session',
    keys: [keys.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// initalize passport
app.use(passport.initialize());
// control our login cookie
app.use(passport.session());
// how is passport calling deseralize or searlize?

app.use('/auth', authRoutes);

app.get('/', (req, res) => res.render('home'))

// connect react to nodejs express server
app.listen(port, () => console.log(`Server is running on port ${port}!`))

