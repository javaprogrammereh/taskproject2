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

// farazSMS.init("pOfLsNK8ZG1XPFqQj_kjySpSHX9Cu1kTxoob67E8V-c=");

// const sendingSms = async () => {
//*
//   const samplePattern = "jp69a8pvmff7p17";
//   const result = await farazCreatePattern(samplePattern, "توضیحات", false);
//   const patternCode = result.data.pattern.code;
//   // console.log("کد الگوی ساخته شده: ", patternCode);
//   await farazSendPattern(patternCode, "989364167437", "989214247039", {
//     otp: "elmira",
//   });
//   console.log("sending successful");
//   // await farazSendSMS("متن پیام جهت ارسال", ["09214247039"], "09214247039");
// };
// sendingSms();

//*routers
//!   /api/v1/file/create
//!   /api/v1/file/index/:id
//!   /api/v1/file/getFile/:id
app.use("/api/v1", require("./modules/routes/api/user/api-v1"));

//!  /api/v1/superAdmin/auth/register
//!  /api/v1/superAdmin/auth/login
//! api/v1/superAdmin/otp/sendcode
//! api/v1/superAdmin/auth/registerOrLogin
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
