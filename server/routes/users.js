///USERS ROUTES

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const config = require("../configs/index");

// Route to get users
router.get("/", (req, res, next) => {
  //// THIS MIGHT BE USEFUL FOR RETURNING A LIST OF USERS OF A CERTAIN CHARITY - SO THE MANAGER CAN ADD/DELETE USERS FOR THEIR CHARITY
  User.find().then(users => {
    res.json(users);
  });
});

module.exports = router;
