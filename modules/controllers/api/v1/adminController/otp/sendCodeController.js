const request = require("request");
const shortId = require("shortid");
const initializeController = require("./initializeController");
const OTP = require("../../../../../models/otp");

module.exports = new (class sendCodeController extends initializeController {
  async sendCode(req, res, next) {
    req.checkBody("recipient", "وارد کردن فیلد الزامیست").notEmpty();
    if (this.showValidationErrors(req, res)) return "";
    try {
      const otp = await OTP.findOne({
        recipient: req.body.recipient,
      });
      if (!otp) {
        const code = await shortId.generate();
        console.log("code is>>>", code);
        await request.post(
          {
            headers: {
              Authorization:
                "AccessKey pOfLsNK8ZG1XPFqQj_kjySpSHX9Cu1kTxoob67E8V-c=",
            },
            url: "http://rest.ippanel.com/v1/messages/patterns/send",
            body: {
              pattern_code: "jp69a8pvmff7p17",
              originator: "+983000505",
              recipient: req.body.recipient,
              values: {
                otp: code,
              },
            },
            json: true,
          },
          async function (error, response, body) {
            if (response) {
              console.log(response.body);
              const values = {
                smsCode: code,
                recipient: req.body.recipient,
              };
              await OTP.create(values);
            } else {
              console.log(error);
            }
          }
        );
        next();
        return this.ok(res, "با موفقیت وارد سیستم شد");
      }
      else{
        return this.ok(res, " کاربر قبلا ثبت شده  ");
      }
    } catch (err) {
      console.log(err);
    }
  }
})();
