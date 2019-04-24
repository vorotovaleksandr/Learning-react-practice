const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const authRoutes = require('./routes/auth');
const keys = require('./config/keys')
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// mongoo connect
mongoose.set('useCreateIndex', true);
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error))

//dev
app.use(cookieParser('some text'));
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// use session
app.use(session({
  secret: keys.skeys,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
      url: keys.mongoURI,
      ttl: 60 * 60
  })
}))

app.use('/auth', authRoutes);
module.exports = app