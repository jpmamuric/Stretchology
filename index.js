const express = require('express');
const http = require("http");
const socketio = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const axios = require('axios');
const config = require('./config/keys');
const PORT = process.env.PORT || 5000;


// Mongoose Setup
require('./models/users');
require('./models/contractors');
require('./models/stretchologists');
require('./models/stretchologistsLocations');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI, {
  useMongoClient: true
});

// Express - Socket Io Setup
const app = express();
const server = http.createServer(app);
const io = socketio.listen(server)


// Middleware
app.use(bodyParser.json());
app.use(cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [config.cookieKey] }));
app.use(passport.initialize());
app.use(passport.session());


// Routes
require('./routes/index')(app);
require('./routes/auth_routes')(app);
require('./routes/billing_routes')(app);
require('./routes/contractor_routes')(app);
require('./routes/stretchologists')(app);

// Catch All Error Handler
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

// Production View Handler
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

io.on("connection", socket => {
  console.log("New client connected");
  getApiAndEmit(socket)

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const getApiAndEmit = async socket => {
  const API_KEY = "cdc481c3e6b4cdd71563246c9af9766a";
  const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
  try {
    const res = await axios.get(`${ROOT_URL}&q=pasadena,us`);
    socket.emit("FromAPI", res.data);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
