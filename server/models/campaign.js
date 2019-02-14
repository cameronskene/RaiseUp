const mongoose = require("mongoose");
const { Schema } = mongoose;

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: [true, "Please provide a unique campaign title or headline"],
      required: [true, "A campaign title or headline is required"]
    },
    pictureUrl: { type: String, required: [true, "A preview image for the campaign is required"] },
    description: { type: String },
    dateRangeStart: { type: String, required: [true, "Provide a start date for this campaign"] },
    dateRangeEnd: { type: String, required: [true, "Provide an end date for this campaign"] },
    fundraisingType: {
      type: String,
      enum: [
        "Appeal",
        "Acquisition",
        "Bequest",
        "Regular Giving",
        "Events",
        "Community Fundraising",
        "Raffles",
        "Sponsorship",
        "Newsletters"
      ]
    },
    stars: { type: Number, default: 0 },
    benchmarks: { type: Array, default: [] },
    agencies: { type: Array, default: [] },
    _charity: { type: Schema.Types.ObjectId, ref: "Charity" },
    _materials: [{ type: Schema.Types.ObjectId, ref: "Material" }]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    usePushEach: true
  }
);

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
