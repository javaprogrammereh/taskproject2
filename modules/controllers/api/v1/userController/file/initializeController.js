const config = require("../../../../../config");
const controller = require(`${config.path.controller}/controller`);

const file = require(`${config.path.model}/file`);
const { index } = require(`${config.path.helper}/indexAggregate`);
const { transform } = require(`${config.path.helper}/transform`);
const { response } = require(`${config.path.helper}/response`);
const itemTransform = [
  "._id",
  ".userId",
  ".title",
  ".file",
  ".format",
  ".slug",
  ".type",
  ".privateKey",
  ".expiretime",
  ".file"
];
module.exports = class initializeController extends controller {
  constructor() {
    super();
    (this.model = { file }),
      (this.helper = { index, response, transform, itemTransform });
  }
};
