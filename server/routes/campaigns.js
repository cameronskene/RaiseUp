//// CAMPAIGN ROUTES 

var express = require('express');
// const Charity = require('../models/charity')
const Campaign = require('../models/campaign')

var router = express.Router();

// Route to get all Campaigns -- this is used for the home page prior to any specific queries from the user
router.get('/', (req, res, next) => {
  Campaign.find()
    .then(campaigns => {
      res.json(campaigns);
    })
    .catch(err => next(err))
});


// TO DO: Route to search for Campaign by query




module.exports = router;
