const mongoose = require('mongoose');
const { Schema } = mongoose;

const materialSchema = new mongoose.Schema({  
  title: {type: String, required: [true, "A material title or headline is required"]},
  pictureUrl: {type: String, required: [true, "A preview image for the material is required"]},
  description: {type: String },
  dateRange: [{type: Date, required: [true, "Provide a date range for when this material was active"] }],
  channels: {type: String, enum: [
    "Direct Mail",
    "Email",
    "Video",
    "Online",
    "Social Media",
    "Thank Yous/ Receipts"
  ] },
  mediaType: {type: String, enum: [
    "Video",
    "Image",
    "Text",
  ], required: [true, "Please select the media form"]},
  sourceUrl: {type: String, required: [true, "You must provide a source for this material"]},
  _campaign: {type: Schema.Types.ObjectId, ref: "Campaign"}

},{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  },
  usePushEach: true
});

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;