const initializeController = require("./initializeController");
const request = require("request");
const otp = require('../../../../../models/otp');
module.exports = new (class sendCodeController extends initializeController {
  async sendCode(req, res,next) {
      req.checkBody("smsCode", "وارد کردن فیلد الزامیست").notEmpty();
      req.checkBody("recipient", "وارد کردن فیلد الزامیست").notEmpty();
      if (this.showValidationErrors(req, res)) return "";
    try {
      await request.post(
        {
            headers: {
                'Authorization': 'AccessKey pOfLsNK8ZG1XPFqQj_kjySpSHX9Cu1kTxoob67E8V-c='
              },
          url: "http://rest.ippanel.com/v1/messages/patterns/send",
          body: {
            
                "pattern_code": "jp69a8pvmff7p17",
                "originator": "+983000505",
                "recipient": req.body.recipient,
                "values": {
                   "otp": "elmira"
               }
             
          },
          json: true,
        },
      async function (error, response, body) {
          if (response) {
            console.log(response.body);
            const values = {
                smsCode: req.body.smsCode,
                recipient: req.body.recipient,
                mode: "",
              };
              await otp.create(values);
              console.log("با موفقیت اضافه شد");
          } else {
            console.log(error);
          }
        }
      );
       next();
    } catch (err) {
      console.log(err);
    }
  }
})();
