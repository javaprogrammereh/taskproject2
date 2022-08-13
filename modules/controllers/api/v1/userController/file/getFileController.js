const fetch = require("node-fetch");
const { recaptcha } = require("../../../../../helpers/recaptcha");
const secretTest = process.env.RECAPTCHA_SECRET_TEST;

const initializeController = require("./initializeController");

module.exports = new (class getFileController extends initializeController {
  async getFile(req, res) {
    try {
      req.checkParams("id", "ای دی وارد شده صحیح نیست").isMongoId();
      if (this.showValidationErrors(req, res)) return "";
      const file = await this.model.file.findById(req.params.id).exec();
      if (!file) return this.abort(res, 404, null, "id");
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

    if (response) {
      console.log("مشکلی در اعتبارسنجی captcha نیست");
      return this.ok(res, " موفقیت  انجام شد");
    } else {
       console.log("error", "مشکلی در اعتبارسنجی captcha هست");
    }
      //*
    
    } catch (err) {
      console.log(err);
      return this.abort(res, 500);
    }  
  }
})();
