const mongoose = require('mongoose');
const { Schema } = mongoose;

const campaignSchema = new mongoose.Schema({  
  title: {type: String, unique: [true, "Please provide a unique campaign title or headline"], required: [true, "A campaign title or headline is required"]},
  pictureUrl: {type: String, required: [true, "A preview image for the campaign is required"]},
  description: {type: String },
  dateRange: [{type: Date, required: [true, "Provide a date range for when this campaign was active"] }],
  fundraisingType: {type: String, enum: [
    "Appeal",
    "Acquisition",
    "Bequest",
    "Regular Giving",
    "Events",
    "Community Fundraising",
    "Raffles",
    "Sponsorship",
    "Newsletters"
  ] },
  stars: {type: Number, default: 0},
  benchmarks: {type: Array, default: []},
  agencies: {type: Array, default: []},
  _charity: {type: Schema.Type.ObjectId, ref: "Charity"},
  _material: [{type: Schema.Type.ObjectId, ref: "Material"}]

},{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  },
  usePushEach: true
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;