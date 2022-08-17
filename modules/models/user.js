const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const userSchema =new Schema({
  name: { type: String },
  username: { type: String, unique: true, required: true, trim: true },
  mobile: { type: String, unique: true, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin","basic"] },
});
userSchema.plugin(uniqueValidator);
userSchema.pre("save",function(next){
  let user = this;
  if(!user.isModified("password")) return next();
  bcrypt.hash(user.password,10,(err,hash)=>{
      if(err) return next(err);
      user.password=hash;
      next();
  });  
});
module.exports = mongoose.model("user", userSchema);
//