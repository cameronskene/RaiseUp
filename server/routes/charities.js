//// CHARITY ROUTES

var express = require("express");
const Charity = require("../models/charity");
const Campaign = require("../models/campaign");
const Material = require("../models/material");
const mongoose = require('mongoose');


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

// Route to get all charities. This is used on initial page load, and fills the CharityList component. It is only when an active charity is clicked by the user that its campaigns and materials are populated.
router.get("/", (req, res, next) => {
  Charity.find()
    .then(charities => {
      res.json(charities);
    })
    .catch(err => next(err));
});

// route to find a charity by its id, also populates its campaigns and materials. This is used when an active charity has been selected by the user.
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  Charity.findById(id)
    .populate({path: "_campaigns", populate:{path: "_materials", model: "Material"}})
    .then(charity => {
      res.json(charity);
    })
    .catch(err => next(err));
});

// Route to add a charity
router.post("/", parser.single('pictureUrl'), (req, res, next) => {
  
  let pictureUrl
  let { name, website, description, sector } = req.body;
  // this is dirty 
  if (req.file) {
    pictureUrl = req.file.url
  }
  else {
     pictureUrl = req.body.pictureUrl;
  }
  
  Charity.create({ name, website, description, sector, pictureUrl })
    .then(charity => {
      res.json({
        success: true,
        charity
      });
    })
    .catch(err => next(err));
});

// route to update a charity
router.put("/:charid", parser.single('pictureUrl'), (req, res, next) => {
  let charid = req.params.charid
  let pictureUrl
  let { name, website, description, sector } = req.body;
  // this is dirty 
  if (req.file) {
    pictureUrl = req.file.url
  }
  else {
     pictureUrl = req.body.pictureUrl;
  }
  
  Charity.findByIdAndUpdate(charid, { name, website, description, sector, pictureUrl })
    .then(updatedCharity => {
      res.json({
        success: true,
        updatedCharity
      });
    })
    .catch(err => next(err));
});

// Route to add a campaign to a charity
router.post("/:charid/campaigns/add",parser.single('pictureUrl'), (req, res, next) => {
  // charity ID
  let charid = req.params.charid;
  let pictureUrl
  // get campaign data from form
  let {
    title,
    description,
    dateRangeStart,
    dateRangeEnd,
    fundraisingType,
    agencies
  } = req.body; 

  // this is dirty 
  if (req.file) {
    pictureUrl = req.file.url
  }
  else {
     pictureUrl = req.body.pictureUrl;
  }
  
  // create said campaign passing charity ID
  Campaign.create({
    _charity: charid,
    title,
    pictureUrl,
    description,
    dateRangeStart,
    dateRangeEnd,
    fundraisingType,
    agencies
  })
    .then(campaign => {
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

// route to update a campaign
router.put("/:charid/campaigns/:campid", parser.single('pictureUrl'), (req, res, next) => {
  let charid = req.params.charid
  let campid = req.params.campid
  let pictureUrl
  // get campaign data from form
  let {
    title,
    description,
    dateRangeStart,
    dateRangeEnd,
    fundraisingType,
    agencies
  } = req.body; 
  // this is dirty 
  if (req.file) {
    pictureUrl = req.file.url
  }
  else {
     pictureUrl = req.body.pictureUrl;
  }

  Campaign.findByIdAndUpdate(campid, {
    _charity: charid,
    title,
    pictureUrl,
    description,
    dateRangeStart,
    dateRangeEnd,
    fundraisingType,
    agencies
  })
    .then(updatedCampaign => {
      res.json({
        success: true,
        updatedCampaign
      });
    })
    .catch(err => next(err));
});

// route to delete a campaign (and all its child materials) DEBUG ADD ASYNC to forEach loop
router.delete("/:charid/campaigns/:campid", (req, res, next) => {
  // campaign ID
  let campid = req.params.campid;
  // remove Campaign
  Campaign.findByIdAndRemove(campid)
    .then(  (removedCampaign) => {
      let promises = []
      // remove each of its materials
      removedCampaign._materials.forEach((element, i) => {
        promises.push(Material.findByIdAndRemove(element))
      })
      return Promise.all(promises)
    })
    .then(materialRemoved => res.json({success:true}))
    .catch(err => next(err));
});

// post new material to a campaign
router.post("/:charid/campaigns/:campid/materials/add", parser.single('pictureUrl'), (req, res, next) => {
  // campaign ID
  let campid = req.params.campid;
  let charid = req.params.charid;
  let pictureUrl

  let {
    title,
    description,
    channels,
    mediaType,
    sourceUrl,
    dateRangeStart,
    dateRangeEnd
  } = req.body;

  // this is dirty 
  if (req.file) {
    pictureUrl = req.file.url
  }
  else {
     pictureUrl = req.body.pictureUrl;
  }

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

// route to update a material
router.put("/:charid/campaigns/:campid/materials/:mateid", parser.single('pictureUrl'), (req, res, next) => {
  let charid = req.params.charid
  let campid = req.params.campid
  let mateid = req.params.mateid
  let pictureUrl
  // get campaign data from form
  let {
    title,
    description,
    channels,
    mediaType,
    sourceUrl,
    dateRangeStart,
    dateRangeEnd
  } = req.body; 
  // this is dirty 
  if (req.file) {
    pictureUrl = req.file.url
  }
  else {
     pictureUrl = req.body.pictureUrl;
  }

  Material.findByIdAndUpdate(mateid, {
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
    .then(updatedCampaign => {
      res.json({
        success: true,
        updatedCampaign
      });
    })
    .catch(err => next(err));
});

// route to delete a material (and its objid references in its parent campaign)
router.delete("/:charid/campaigns/:campid/materials/:mateid", (req, res, next) => {
  // campaign ID
  let campid = req.params.campid;
  let mateid = req.params.mateid;
  
  Material.findById(mateid)
    .then(removedMaterial => {
      // find campaign, update by removing the ref to to the soon to be deleted material
      Campaign.findByIdAndUpdate(campid, {$pull: {"_materials": mongoose.Types.ObjectId(mateid) } })
      .then (result => {
        // delete the material
        Material.deleteOne({_id: mateid}).then(result => {
          // success
          res.json(result);
        })
      })
    })
    .catch(err => next(err));
});



module.exports = router;
