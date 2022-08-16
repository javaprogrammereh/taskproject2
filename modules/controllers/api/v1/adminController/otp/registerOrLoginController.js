 const initializeController = require("./initializeController");
  
  module.exports = new (class registerOrLoginController extends initializeController {
    async registerOrLogin(req, res) {
      req.checkBody("smsCode", "وارد کردن فیلد نام الزامیست").notEmpty();
      req.checkBody("recipient", "وارد کردن فیلد نام کاربری الزامیست").notEmpty();
      if (this.showValidationErrors(req, res)) return "";
      try {
        const otp = await this.model.otp
          .findOne({
            smsCode: req.body.smsCode,
          })
          .exec();
          let values = {};
          if (otp){
                     values = {
                        smsCode: req.body.smsCode,
                        recipient: req.body.recipient,
                        mode:"login",
                      };
                }
      
                 values = {
                    smsCode: req.body.smsCode,
                    recipient: req.body.recipient,
                    mode: "register",
                  };

        // const values = {
        //   smsCode: req.body.smsCode,
        //   mobile: req.body.mobile,
        //   mode: req.body.mode,
        // };
        await this.model.otp.create(values);
        return this.ok(res, "با موفقیت اضافه شد");
      } catch (err) {
        console.log(err);
        return this.abort(res, 500);
      }
    }
  })();
  