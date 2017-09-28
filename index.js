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
require('./models/stretchologistsLocations');
require('./models/bookings');
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
require('./routes/stretchologists')(app);
require('./routes/booking_routes')(app);

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
  console.log("Socket connected: " + socket.id);

  socket.on('action', action => {
    if(action.type === 'server/socketId'){
      socket.emit("action", { type: 'FETCH_SOCKET_ID', payload: socket.id });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
  });
});


server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
