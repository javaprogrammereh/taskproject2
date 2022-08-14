const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
var expressValidator = require("express-validator");
const dotEnv = require("dotenv");
const {
  farazSMS,
  farazSendSMS,
  farazCreatePattern,
  farazSendPattern,
} = require("@aspianet/faraz-sms");
const connectDB = require("./modules/config/db");
dotEnv.config({ path: "./modules/config/config.env" });
const releasesV = process.env.RELEASES_V;

connectDB();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(expressValidator());
app.use(mongoSanitize());

farazSMS.init("pOfLsNK8ZG1XPFqQj_kjySpSHX9Cu1kTxoob67E8V-c=");
//http://docs.ippanel.com/#operation/SendSMS
const sendingSms = async () => {
  // await farazSendSMS( 'متن پیام جهت ارسال', [ '09214247039' ], '09214247039'  );
  //*
//   const samplePattern = `مشترک گرامی %name% عزیز به پنل کاربری خود خوش آمدید.
//                        www.example-company.com
//                        نام شرکت`;

// const result = await farazCreatePattern( samplePattern, "توضیحات", false );
// const patternCode = result.data.pattern.code;
// console.log( "کد الگوی ساخته شده: ", patternCode );
//*
  // const samplePattern = "jp69a8pvmff7p17";
  // // const samplePattern = `مشترک گرامی %name% عزیز به پنل کاربری خود خوش آمدید.
  // //                      www.example-company.com
  // //                      نام شرکت`;
  // const result = await farazCreatePattern(samplePattern, "توضیحات", false);
  // const patternCode = result.data.pattern.code;
  // console.log("کد الگوی ساخته شده: ", patternCode);
  // // patternCode = متغیر دربرگیرنده کد الگوی تولید و تایید شده
  // await farazSendPattern(patternCode, "09112115594", "09214247039", {
  //   name: "elmira",
  // });
  // console.log("sending successful");
  // await farazSendSMS("متن پیام جهت ارسال", ["09214247039"], "09214247039");
};
sendingSms();


//*routers
//!   /api/v1/file/create
//!   /api/v1/file/index/:id
//!   /api/v1/file/getFile/:id
app.use("/api/v1", require("./modules/routes/api/user/api-v1"));

//!  /api/v1/superAdmin/auth/register
//!  /api/v1/superAdmin/auth/login
app.use("/api/v1/superAdmin", require("./modules/routes/api/admin/api-v1"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at Port ${PORT}`);
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({
    message: {
      message: "!خطای سرور",
      field: null,
      logcode,
    },
    status: 500,
    success: false,
    v: releasesV,
  });
  next();
});
