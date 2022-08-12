const initializeController = require("./initializeController");

module.exports = new (class recaptchaController extends initializeController {
  async recaptcha(req, res) {
    try {
      //*
      res.render("recaptcha", {
        pageTitle: "ورود به بخش recaptcha",
        path: "/recaptcha",
        message:"success_msg",
        error: "error",
    });
      //*
      // return this.ok(res, " موفقیت  انجام شد");
    } catch (err) {
      console.log(err);
      return this.abort(res, 500);
    }
  }
})();
