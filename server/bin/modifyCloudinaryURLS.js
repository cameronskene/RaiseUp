require("dotenv").config();

const mongoose = require("mongoose");
const Campaign = require("../models/campaign");

const dbName = "RaiseUp";
const mongoUri = process.env.MONGODB_URI || `mongodb://localhost/${dbName}`;

// connect to the database
mongoose.connect(mongoUri);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log(`Connected to the database (${mongoUri})`);
});

Campaign.find().then(result => {
  let campaignsToModify = result;
  campaignsToModify.forEach(campaign => {
    //http to https
    let modifiedUrl = campaign.pictureUrl;
    if (modifiedUrl.substring(0, 5) !== "https") {
      modifiedUrl = "https" + campaign.pictureUrl.substring(4);
    }
    // resize to 50%
    let temp = modifiedUrl.slice().split("/");
    temp.splice(6, 0, "h_0.5,w_0.5");
    campaign.pictureUrl = temp.join("/");
  });
  // todo: write to the database
});

setTimeout(function() {
  console.log("connection closing");
  mongoose.connection.close();
}, 3000);
