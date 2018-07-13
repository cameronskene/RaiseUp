const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  // email: String, // Defined with passportLocalMongoose
  // hashed: String, // Defined with passportLocalMongoose
  // salt: String, // Defined with passportLocalMongoose
  role: {type: String, enum:["BASIC", "MANAGER", "ADMIN"], default: "BASIC"},
  _charity: [{type: Schema.Types.ObjectId, required: true, ref: "Charity"}]
});

// Add "email" (instead of "username"), "hash" and "salt" field to store the email (as username), the hashed password and the salt value
// Documentation: https://github.com/saintedlama/passport-local-mongoose
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  },
  usePushEach: true
});

module.exports = mongoose.model('User', userSchema);