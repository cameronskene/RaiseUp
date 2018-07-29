//// CAMPAIGN ROUTES

var express = require("express");
// const Charity = require('../models/charity')
const Campaign = require("../models/campaign");
const Charity = require("../models/charity");
const Material = require("../models/material");

var router = express.Router();

// Route to get all Campaigns -- this is used for the home page prior to any specific queries from the user
router.get("/", (req, res, next) => {
  Campaign.find()
    .then(campaigns => {
      res.json(campaigns);
    })
    .catch(err => next(err));
});

//  Route to search for Campaign by query -- fundraisingType
router.get("/search", (req, res, next) => {
  // let query = Object.entries(req.query)
  // 
  let keys = Object.keys(req.query);
  

  // this is the simplified model:
  
  if (keys.includes("sector")) {
    Charity.find({ sector: req.query.sector }).populate({
      path: "_campaigns", 
      populate: {
        path: "_materials", 
        model: "Material"
      }
    })
      .then(charities => {
        res.json(charities);
      })
      .catch(err => next(err));
  }
  else if (keys.includes("name")) {
    Charity.find({ name: req.query.name }).populate({
      path: "_campaigns", 
      populate: {
        path: "_materials", 
        model: "Material"
      }
    })
      .then(charities => {
        res.json(charities);
      })
      .catch(err => next(err));
  }
  else if (keys.includes("fundraisingType")) {
    Campaign.find({ fundraisingType: req.query.fundraisingType }).populate({path: "_charity"}).populate("_materials")
    
    
      .then(campaigns => {
        res.json(campaigns);
      })
      .catch(err => next(err));
  }
  else if (keys.includes("dateRangeStart")) {
    Campaign.find({ dateRangeStart: req.query.dateRangeStart }).populate({path: "_charity"}).populate("_materials")
      
      .then(campaigns => {
        res.json(campaigns);
      })
      .catch(err => next(err));
  }
  else if (keys.includes("title")) {
    Campaign.find({ title: req.query.title }).populate({path: "_charity"}).populate("_materials")
      
      .then(campaigns => {
        res.json(campaigns);
      })
      .catch(err => next(err));
  }
  else if (keys.includes("channels")) {
    let query = req.query.channels
    if (req.query.channels === "SocialMedia") {
      query = "Social Media"
    }
    else if (req.query.channels === "DirectMail") {
      query = "Direct Mail"
    }
    else if (req.query.channels === "ThankYousReceipts") {
      query = "Thank Yous/ Receipts"
    }
    Material.find({ channels: query })
    .populate({path: "_campaign", populate: ["_materials", "_charity"]})
      .then(materials => {
        let campaigns = [];
        let id = ""
        materials.forEach(material => {
          if (id !== material._charity._id) {
            campaigns.push(material._campaign);
            id = material._charity._id
          }
        });
        res.json(campaigns);

        // res.json(materials);
      })
      .catch(err => next(err));
  }
});

module.exports = router;
