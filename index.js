const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const config = require('./config/keys');
const PORT = process.env.PORT || 5000;

require('./models/users');
require('./models/contractors');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI, {
  useMongoClient: true
});

const app = express();
const socket_io = require('socket.io')
const io = socket_io();

app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [config.cookieKey] }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/index')(app);
require('./routes/auth_routes')(app);
require('./routes/billing_routes')(app);
require('./routes/contractor_routes')(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


io.listen(app.listen(PORT, () => {
  console.log('server running on port', PORT );
}));
