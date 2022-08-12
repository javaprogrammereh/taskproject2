const fetch = require("node-fetch");
const { recaptcha } = require("../../../../../helpers/recaptcha");
const secretTest = process.env.RECAPTCHA_SECRET_TEST;

const initializeController = require("./initializeController");

module.exports = new (class getFileController extends initializeController {
  async getFile(req, res) {
    try {
      //*
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
