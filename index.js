const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const config = require('./config/keys');

require('./models/users');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI, {
  useMongoClient: true
});

const app = express();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT);
