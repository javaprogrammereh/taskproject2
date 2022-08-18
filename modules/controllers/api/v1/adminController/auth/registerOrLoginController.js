const initializeController = require("./initializeController");
const OTP = require('../../../../../models/otp');
module.exports =
  new (class registerOrLoginController extends initializeController {
    async registerOrLogin(req, res) {
      req.checkBody("smsCode", "وارد کردن فیلد الزامیست").notEmpty();
      if (this.showValidationErrors(req, res)) return "";
      try {
        let Transform;
        const otp = await OTP.findOne({
          smsCode: req.body.smsCode,
        });
        if (!otp) return this.abort(res, 401);
        const user = await this.model.user.findOne({
          mobile: otp.recipient,
        });
        if (!user) {
          const values = {
            name: "",
            mobile: "",
            email: "",
            username: "",
            password: "",
            role: "basic",
          };
          Transform = await this.helper.transform(
            values,
            this.helper.itemTransform,
            false,
            req.connection.remoteAddress,
            req.get("User-Agent")
          );
        } else {
          Transform = await this.helper.transform(
            user,
            this.helper.itemTransform,
            false,
            req.connection.remoteAddress,
            req.get("User-Agent")
          );
        }
        return this.helper.response(res, null, 200, Transform);
      } catch (err) {
        console.log(err);
      }
    }
  })();
