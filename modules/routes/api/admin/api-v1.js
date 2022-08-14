const config = require("../../../config");
const express = require("express");
const { Router } = require("express");

const router = new Router();

//*middleware


const { admin: adminController } = config.path.controllersApi.v1;


// *auth
const registerController = require(`${adminController}/auth/registerController`);
const loginController = require(`${adminController}/auth/loginController`);

//*auth
const authRouter = express.Router();
authRouter.post("/register",registerController.register.bind(registerController));
authRouter.post("/login", loginController.login.bind(loginController));
router.use("/auth", authRouter);



module.exports = router;



