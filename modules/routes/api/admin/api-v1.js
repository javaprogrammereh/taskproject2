const config = require("../../../config");
const express = require("express");
const { Router } = require("express");

const router = new Router();

//*middleware


const { admin: adminController } = config.path.controllersApi.v1;


//*otp
const sendCodeController = require(`${adminController}/otp/sendCodeController`);

// *auth
const registerController = require(`${adminController}/auth/registerController`);
const loginController = require(`${adminController}/auth/loginController`);
const registerOrLoginController = require(`${adminController}/auth/registerOrLoginController`);

//*auth
const authRouter = express.Router();
authRouter.post("/register",registerController.register.bind(registerController));
authRouter.post("/login", loginController.login.bind(loginController));
authRouter.get("/registerOrLogin",registerOrLoginController.registerOrLogin.bind(registerOrLoginController));
router.use("/auth", authRouter);


//*otp
const otpRouter = express.Router();
otpRouter.post("/sendcode",sendCodeController.sendCode.bind(sendCodeController));
router.use("/otp", otpRouter);


module.exports = router;



