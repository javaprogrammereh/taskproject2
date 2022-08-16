const config = require("../../../../../config");
const controller = require(`${config.path.controller}/controller`);
const otp = require(`${config.path.model}/otp`);
const { response } = require(`${config.path.helper}/response`);
const { transform } = require(`${config.path.helper}/transform`);
const itemTransform = [
  "._id",
  ".smsCode",
  ".mobile",
  ".mode",
];

module.exports = class initializeController extends controller {
  constructor() {
    super();
    (this.model = { otp }),
      (this.helper = { response, transform, itemTransform });
  }
};
