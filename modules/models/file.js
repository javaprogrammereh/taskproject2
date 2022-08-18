const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const URLSlugs = require('mongoose-url-slugs');

const Schema = mongoose.Schema;
const userSchema =new Schema({
  userId: [{ type: Schema.Types.ObjectId, ref: "user", required: true }],
  title: { type: String ,required: true, trim: true  },
  file:{type: String },
  format:{type: String },
  slug: { type: String, required: true,unique: true,},
  type: { type: String, required: true ,enum: ["public", "private"]},
  privateKey: { type: String , required: true,trim: true},
  expiretime:{type:Date, expires: '5d', default:'5d'}
});
userSchema.plugin(uniqueValidator);
userSchema.plugin(URLSlugs('title', {field: 'slug'}));
module.exports = mongoose.model("file", userSchema);
