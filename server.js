require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
// want to set up at the top of the page
const session = require('express-session')
const SECRET_SESSION = process.env.SECRET_SESSION
//put passport below msession middle
const passport = require('./config/ppConfig')
const flash = require('connect-flash')

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
// middlewear
// secret: what we actualy giving the client to user to use our site / session cookie
// resave: save the ession even if its modified, make this false
// saveUninitialized: new session but hast changed we'll save it
app.use(session ({
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}))
// make sure to put under app.use(session ) or it will give errors saying it doesnt know what your taling about
// add middlewear for passort under the use session
// initialized passport and run session as middleware
// passport is our login and our logout functionality
// go to controllers
app.use(passport.initialize())
app.use(passport.session())

// flash for temporary messges to the user error messages sent to the user
app.use(flash())



app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.use('/auth', require('./routes/auth'));


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
});

module.exports = server;
