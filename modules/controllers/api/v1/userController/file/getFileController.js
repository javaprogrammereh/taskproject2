const { recaptcha } = require("../../../../../helpers/recaptcha");

const initializeController = require("./initializeController");

module.exports = new (class getFileController extends initializeController {
  async getFile(req, res) {
    try {
      req.checkParams("id", "ای دی وارد شده صحیح نیست").isMongoId();
      if (this.showValidationErrors(req, res)) return "";
      const file = await this.model.file.findById(req.params.id).exec();
      if (!file) return this.abort(res, 404, null, "id");
      const Transform = await this.helper.transform(
        file,
        this.helper.itemTransform
      );
      //*
      if (file.type === "private") {
        const pKey = req.body.privateKey;
        if(pKey===file.privateKey){
          console.log("private key equals... ");
        }
        else{
          console.log("private key not equals & enter private key... ");
        }
      }
     const response = recaptcha(
      req.body["g-recaptcha-response"],
      req.connection.remoteAddress
    );
    if (!response) {
      console.log("error", "مشکلی در اعتبارسنجی captcha هست");
    }
      //*
      return this.helper.response(res, null, 200, Transform);
    } catch (err) {
      console.log(err);
      return this.abort(res, 500);
    }  
  }
})();
