//// SEARCH ROUTES

var express = require("express");
const Campaign = require("../models/campaign");
const Charity = require("../models/charity");
const Material = require("../models/material");

var router = express.Router();

function formatQuery(query) {
  return query.replace(/\b\S/g, c => {
    return c.toUpperCase();
  });
}

//  Route to search for Campaign by query
router.get("/", (req, res, next) => {
  let keys = Object.keys(req.query);
  if (keys.includes("sector")) {
    Charity.find({ sector: formatQuery(req.query.sector) })
      .populate({
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
  } else if (keys.includes("name")) {
    Charity.find({ name: formatQuery(req.query.name) })
      .populate({
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
  } else if (keys.includes("fundraisingType")) {
    Campaign.find({ fundraisingType: formatQuery(req.query.fundraisingType) })
      .populate({ path: "_charity" })
      .populate("_materials")

      .then(campaigns => {
        res.json(campaigns);
      })
      .catch(err => next(err));
  } else if (keys.includes("dateRangeStart")) {
    Campaign.find({ dateRangeStart: formatQuery(req.query.dateRangeStart) })
      .populate({ path: "_charity" })
      .populate("_materials")

      .then(campaigns => {
        res.json(campaigns);
      })
      .catch(err => next(err));
  } else if (keys.includes("title")) {
    Campaign.find({ title: formatQuery(req.query.title) })
      .populate({ path: "_charity" })
      .populate("_materials")

      .then(campaigns => {
        res.json(campaigns);
      })
      .catch(err => next(err));
  } else if (keys.includes("channels")) {
    let query = req.query.channels;
    if (req.query.channels === "SocialMedia") {
      query = "Social Media";
    } else if (req.query.channels === "DirectMail") {
      query = "Direct Mail";
    } else if (req.query.channels === "ThankYousReceipts") {
      query = "Thank Yous/ Receipts";
    }
    Material.find({ channels: formatQuery(query) })
      .populate({ path: "_campaign", populate: ["_materials", "_charity"] })
      .then(materials => {
        let campaigns = [];
        let id = "";
        materials.forEach(material => {
          if (id !== material._charity._id) {
            campaigns.push(material._campaign);
            id = material._charity._id;
          }
        });
        res.json(campaigns);
      })
      .catch(err => next(err));
  }
});

module.exports = router;
