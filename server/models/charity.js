const mongoose = require('mongoose');
const { Schema } = mongoose;

const charitySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "Please provide a unique charity name"],
    required: [true, 'The charity name is required']
  },
  sector: {
    type: String,
    enum: [
      "Education & Research",
      "Health",
      "Social Services",
      "Development & Housing",
      "Religion",
      "Law & Advocacy",
      "Culture & Recreation",
      "International Aid",
      "Environment/ Animals",
    ]
  },
  description: {
    type: String,
  },
  website: {
    type: String,
    required: [true, "A website URL is required"]
  },
  pictureUrl: {
    type: String,
    required: [true, "A picture or logo URL is required"]
  },
  _managers: [{
    type: Schema.Types.ObjectId, ref: "User"
  }],
  _campaigns: [{
    type: Schema.Types.ObjectId, ref: "Campaign"
  }],
}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    usePushEach: true
  });

const Charity = mongoose.model('Charity', charitySchema);

module.exports = Charity;
