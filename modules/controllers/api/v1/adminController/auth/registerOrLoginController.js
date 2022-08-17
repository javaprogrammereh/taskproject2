const initializeController = require("./initializeController");

module.exports = new (class registerOrLoginController extends initializeController {
    async registerOrLogin(req, res) {
      req.checkBody("mobile", "وارد کردن فیلد الزامیست").notEmpty();
      if (this.showValidationErrors(req, res)) return "";
      try {
        let Transform;
        const user = await this.model.user.findOne({
          mobile: req.body.mobile,
        });
        if (!user) {
          const values = {
            name: "",
            mobile: req.body.recipient,
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
        return this.abort(res, 500);
      }
    }
  })();
