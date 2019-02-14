require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const config = require("./configs/index");
var User = require("./models/user");
var authRoutes = require("./routes/auth");
var usersRoutes = require("./routes/users");
var charitiesRoutes = require("./routes/charities");
var searchRoutes = require("./routes/search");

require("./configs/database");
require("./configs/cloudinary");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static(path.join(__dirname, "../client/build")));

app.use(passport.initialize());
// Create the strategy for JWT
const strategy = new Strategy(
  {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  (payload, done) => {
    User.findById(payload.id).then(user => {
      if (user) {
        done(null, user);
      } else {
        done(new Error("User not found"));
      }
    });
  }
);
passport.use(strategy);

// All API routes
app.use("/api", authRoutes);
app.use("/api/charities", charitiesRoutes); // this route has 95% of the business logic
app.use("/api/search", searchRoutes);
app.use("/api/users", usersRoutes);

app.use("/api/*", (req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  console.error("----- An error happened -----");
  console.error(err);
  if (process.env.NODE_ENV === "production") res.json(err);
  else res.json(JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))));
});

module.exports = app;
