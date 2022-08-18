const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const otpSchema =new Schema({
  smsCode:{type: String},
  recipient:{type: String},
  mode:{type: String}
});
otpSchema.plugin(uniqueValidator);

module.exports = mongoose.model("otp", otpSchema);
