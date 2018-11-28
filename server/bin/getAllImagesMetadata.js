require("dotenv").config();
let cloudinary = require("cloudinary");
var fs = require("fs");

console.log("connecting to cloudinary cloud: ", process.env.CLOUDINARY_CLOUD_NAME);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var results = {};

cloudinary.v2.api
  .resources({ max_results: 500 }, function(error, result) {
    results = result;
  })
  .then(result => {
    fs.writeFile("./results.json", JSON.stringify(results), err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File has been created");
    });
  });

// just add: /w_0.5,h_0.5/ as a transformation to: /upload/${transformation}/v[ersionNumber]
