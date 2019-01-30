/**
 * @description server file for backend database: MongoDb
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./server/config');
const logger = require('morgan')

const PORT = process.env.PORT || 3001;
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const uri = process.env.MONGODB_URI || config.MongoURI;
mongoose.connect(uri,{ useNewUrlParser: true })
.then(() => console.log(`😍 => connect to mongoDB`))
.catch(err => {
  console.log(`😵 => problem in connect to mongoDB`);
  process.exit(1);
});

mongoose.Promise = global.Promise;

app.use(logger("dev"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// const htmlRoutes = require('./server/routes/html-route');
// app.use('/', htmlRoutes);
const authRoutes = require('./server/routes/auth-route');
const apiRoutes = require('./server/routes/api-routes');
const postRoutes = require('./server/routes/post-routes');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/post', postRoutes);

// require('./server/sockets/message-sockets')(io);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

server.listen(PORT, () => {
  console.log(`🌎 => connecting with port  ${PORT}`);
});
