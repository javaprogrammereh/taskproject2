const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require("mongoose-timestamp");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const tokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  token: { type: String },
  liveTime: { type: Date },
  deviceName: { type: String },
  lastIp: { type: String },
});
tokenSchema.plugin(timestamps);
tokenSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("token", tokenSchema);
