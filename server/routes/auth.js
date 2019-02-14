const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jwt-simple");
const passport = require("passport");
const config = require("../configs/index");

router.post("/signup", (req, res, next) => {
  // extract the info from body
  const { email, password, role } = req.body;
  const user = new User({
    email,
    role
  });

  User.register(user, password, err => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

router.post("/login", (req, res, next) => {
  const authenticate = User.authenticate();
  const { email, password } = req.body;
  // check if we have a email and password
  if (email && password) {
    // test if the credentials are valid
    authenticate(email, password, (err, user, failed) => {
      if (err) {
        return next(err);
      }
      if (failed) {
        return res.status(401).json({
          error: failed.message
        });
      }
      if (user) {
        const payload = {
          id: user.id
        };
        const token = jwt.encode(payload, config.jwtSecret);
        res.json({
          token,
          name: user.name
        });
      }
    });
  } else {
    // unauthorized error
    res.sendStatus(401);
  }
});

router.get("/secret", passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  res.json({
    yourProject: "good idea",
    user: req.user
  });
});

module.exports = router;
