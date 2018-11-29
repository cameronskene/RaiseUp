require("dotenv").config();

const mongoose = require("mongoose");
const Campaign = require("../models/campaign");
const Material = require("../models/material");

const dbName = "RaiseUp";
const mongoUri = process.env.MONGODB_URI || `mongodb://localhost/${dbName}`;

// connect to the database
mongoose.connect(mongoUri);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log(`Connected to the database (${mongoUri})`);
  let promises = [];

  // Campaign.find()
  //   .then(result => {
  //     let campaignsToModify = result;
  //     campaignsToModify.forEach(campaign => {
  //       //http to https
  //       let modifiedUrl = campaign.pictureUrl;
  //       if (modifiedUrl.substring(0, 5) !== "https") {
  //         modifiedUrl = "https" + campaign.pictureUrl.substring(4);
  //       }
  //       // resize to 50%
  //       let temp = modifiedUrl.slice().split("/");
  //       temp.splice(6, 0, "h_0.5,w_0.5");
  //       campaign.pictureUrl = temp.join("/");
  //       promises.push(Campaign.findByIdAndUpdate(campaign._id, campaign));
  //     });
  //   })
  //   .then(res => {
  //     Promise.all(promises).then(_ => {
  //       setTimeout(() => {
  //         console.log("connection closing");
  //         mongoose.connection.close();
  //       }, 10000);
  //     });
  //   });

  //   Material.find()
  //     .then(result => {
  //       let materialsToModify = result;
  //       materialsToModify.forEach(material => {
  //         // http to https
  //         let modifiedUrl = material.pictureUrl;
  //         if (modifiedUrl.substring(0, 5) !== "https") {
  //           modifiedUrl = "https" + material.pictureUrl.substring(4);
  //         }
  //         // // resize to 50%
  //         let temp = modifiedUrl.slice().split("/");
  //         temp.splice(6, 0, "h_0.5,w_0.5");
  //         material.pictureUrl = temp.join("/");
  //         promises.push(Material.findByIdAndUpdate(material._id, material));
  //       });
  //     })
  //     .then(_ => {
  //       Promise.all(promises).then(_ => {
  //         setTimeout(() => {
  //           console.log("connection closing");
  //           mongoose.connection.close();
  //         }, 10000);
  //       });
  //     });
});
