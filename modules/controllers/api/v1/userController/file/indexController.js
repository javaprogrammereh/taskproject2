const initializeController = require("./initializeController");
const mongoose = require("mongoose");

module.exports = new (class indexController extends initializeController {
  async index(req, res) {
    req.checkParams("id", "The entered ID is incorrect").isMongoId();
    if (this.showValidationErrors(req, res)) return "";
    try {
      const query = { _id: mongoose.Types.ObjectId(req.params.id) };
      let sort = {};
      sort = { ...sort, _id: -1 };
      const queryData = [{ $match: query }];
      const aggregateData = [
        {
          $project: {
            "file._id": 0,
            "file.userId": 0,
            "file.__v": 0,
            "file.updatedAt": 0,
            "file.createdAt": 0,
            "file.file": 0,
            "file.format": 0,           
          },
        },
      ];
      const result = await this.helper.index(
        req,
        "file",
        queryData,
        aggregateData,
        sort
      );
      if (!result) return this.abort(res, 500);
      const Transform = await this.helper.transform(
        result,
        this.helper.itemTransform,
        true
      );
      return this.helper.response(res, null, 200, Transform);
    } catch (err) {
      console.log(err);
      return this.abort(res, 500);
    }
  }
})();
