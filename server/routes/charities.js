//// CHARITY ROUTES

var express = require("express");
const Charity = require("../models/charity");
const Campaign = require("../models/campaign");
const Material = require("../models/material");

var router = express.Router();

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'RaiseUp/Charity',
  allowedFormats: ['jpg', 'png', 'gif'],
});

const parser = multer({ storage });

// Route to get all charities
router.get("/", (req, res, next) => {
  Charity.find()
    .then(charities => {
      res.json(charities);
    })
    .catch(err => next(err));
});

// route to find a charity by its id, also populates its campaigns
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  Charity.findById(id)
    .populate("_campaigns")
    .then(charity => {
      res.json(charity);
    })
    .catch(err => next(err));
});



// Route to add a charity
router.post("/", parser.single('pictureUrl'), (req, res, next) => {
  // console.log("req.file", req.file);
  let pictureUrl = req.file.url
  
  var { name, website, description, sector } = req.body;
  // console.log("req body pictureUrl: ", req.body.pictureUrl)
  // console.log("PICTURE URL IN ROUTE: ", pictureUrl)
  Charity.create({ name, website, description, sector, pictureUrl })
    .then(charity => {
      res.json({
        success: true,
        charity
      });
    })
    .catch(err => next(err));
});

// Route to add a campaign to a charity
router.post("/:id/campaigns/add",parser.single('pictureUrl'), (req, res, next) => {
  // console.log("req.file", req.file);
  let pictureUrl = req.file.url
  
  // charity ID
  let id = req.params.id;
  // console.log("id: ", id);
  // get campaign data from form
  // console.log("req.body in campaigns add route: ", req.body);
  let {
    title,
    // pictureUrl,
    description,
    dateRangeStart,
    dateRangeEnd,
    fundraisingType,
    agencies
  } = req.body;
  // create said campaign passing charity ID
  Campaign.create({
    _charity: id,
    title,
    pictureUrl,
    description,
    dateRangeStart,
    dateRangeEnd,
    fundraisingType,
    agencies
  })
    .then(campaign => {
      // console.log("campaign._charity: ", campaign._charity);
      // then update the corresponding charity._campaigns array with the objid of the campaign
      Charity.findByIdAndUpdate(campaign._charity, {
        $push: { _campaigns: campaign._id }
      }).then(result => {
        // success
        res.json({
          success: true,
          campaign
        });
      });
    })
    .catch(err => next(err));
});

// get campaign info by its id
router.get("/:charid/campaigns/:campid", (req, res, next) => {
  // campaign ID
  let campid = req.params.campid;

  // then update the corresponding charity._campaigns array with the objid of the campaign
  Campaign.findById(campid)
    .populate("_materials")
    .then(campaign => {
      // success
      res.json(campaign);
    })
    .catch(err => next(err));
});

// get material info by its id
router.get("/:charid/campaigns/:campid/materials/:mateid", (req, res, next) => {
  // campaign ID
  let mateid = req.params.mateid;

  // then update the corresponding charity._campaigns array with the objid of the campaign
  Material.findById(mateid)
    .then(material => {
      // success
      res.json(material);
    })
    .catch(err => next(err));
});


// post new material for a campaign
router.post("/:charid/campaigns/:campid/materials/add", parser.single('pictureUrl'), (req, res, next) => {
  console.log("req.file in materials POST", req.file);
  let pictureUrl = req.file.url
  
  // campaign ID
  let campid = req.params.campid;
  let charid = req.params.charid;

  let {
    title,
    // pictureUrl,
    description,
    channels,
    mediaType,
    sourceUrl,
    dateRangeStart,
    dateRangeEnd
  } = req.body;
  // create said campaign passing charity ID
  Material.create({
    _charity: charid,
    _campaign: campid,
    title,
    pictureUrl,
    description,
    channels,
    mediaType,
    sourceUrl,
    dateRangeStart,
    dateRangeEnd
  })
    .then(material => {
      // then update the corresponding charity._campaigns array with the objid of the campaign
      Campaign.findByIdAndUpdate(campid, { $push: { _materials: material._id } })
        .catch(err => console.log(err))
        .then(result => {
          // success
          res.json({
            success: true,
            material
          });
        });
    })
    .catch(err => next(err));
});



module.exports = router;
