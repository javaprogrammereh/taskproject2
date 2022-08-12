const axios = require("axios");
const url = process.env.RECAPTCHA_URL;
const secretTest = process.env.RECAPTCHA_SECRET_TEST;

const MY_CAPTCHA_SECRET = process.env.MY_CAPTCHA_SECRET;
const MY_FRONT_CAPTCH = process.env.MY_FRONT_CAPTCH;

module.exports.recaptcha = async (responseKey, ip) => {
  try {
    const config = {
      method: "POST",
      url: `${url}${secretTest}&response=${responseKey}&remoteip=${ip}`,
      headers: {},
    };
    const response = await axios(config);
      if (response) {
        console.log("success","مشکلی در اعتبارسنجی captcha نیست");
      } else {
         console.log("error", "مشکلی در اعتبارسنجی captcha هست");
      }
    return response;
  } catch (err) {
    console.log(err);
    return false;
  }
};
