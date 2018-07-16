/// MATERIALS ROUTES 
var express = require('express');
const Charity = require('../models/charity')
const Material = require('../models/material')

var router = express.Router();

// const cloudinary = require('cloudinary');
// const cloudinaryStorage = require('multer-storage-cloudinary');
// const multer = require('multer');

// const storage = cloudinaryStorage({
//   cloudinary,
//   folder: 'my-images',
//   allowedFormats: ['jpg', 'png', 'gif'],
// });

// const parser = multer({ storage });

// Route to get all materials --- WONT BE NEEDED BUT MAY AS WELL HAVE FOR DEBUG
router.get('/', (req, res, next) => {
  Material.find()
    .then(charities => {
      res.json(charities);
    })
    .catch(err => next(err))
});

// route to find a charity by its id
router.get('/:id', (req, res, next) => {
  console.log(req.params.id)
  let id = req.params.id 
  
  Charity.findById(id)
    .then(charity => {
      console.log(charity)
      res.json(charity);
    })
    .catch(err => next(err))
});


// Route to add a charity
router.post('/', (req, res, next) => {
  let {name, website, pictureUrl, description, sector} = req.body

  Charity.create({name, website, pictureUrl, description, sector})
    .then(charity => {
      res.json({
        success: true,
        charity
      });
    })
    .catch(err => next(err))
});


// Route to add a picture on one user with Cloudinary
// To perform the request in HTML:
//   <form method="post" enctype="multipart/form-data" action="http://localhost:3030/api/users/first-user/pictures">
//     <input type="file" name="picture" />
//     <input type="submit" value="Upload" />
//   </form>

module.exports = router;
