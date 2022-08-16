const initializeController = require("./initializeController");
const request = require("request");

module.exports = new (class sendCodeController extends initializeController {
  async sendCode(req, res,next) {
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
                "recipient": "+989214247039",
                "values": {
                   "otp": "elmira"
               }
             
          },
          json: true,
        },
        function (error, response, body) {
          if (response) {
            console.log(response.body);
          } else {
            console.log(error);
          }
        }
      );
       next();
    } catch (err) {
      console.log(err);
      return this.abort(res, 500);
    }
  }
})();
