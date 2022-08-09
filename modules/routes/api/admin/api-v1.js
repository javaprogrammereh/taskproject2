const config = require("../../../config");
const express = require("express");
const { Router } = require("express");

const router = new Router();

//*middleware
const apiSuperAdmin = require(`${config.path.middleware}/superAdmin/apiSuperAdmin`);

const { admin: adminController } = config.path.controllersApi.v1;


//*users
// const getUserController = require(`${adminController}/users/indexController`);
// const updateUserController = require(`${adminController}/users/updateController`);

// *auth
const registerController = require(`${adminController}/auth/registerController`);
const loginController = require(`${adminController}/auth/loginController`);

//*auth
const authRouter = express.Router();
authRouter.post("/register",registerController.register.bind(registerController));
authRouter.post("/login", loginController.login.bind(loginController));
router.use("/auth", authRouter);

//*users
// const usersRouter = express.Router();
// usersRouter.get("/index",getUserController.getAll.bind(getUserController));
// usersRouter.put("/update/:id",updateUserController.update.bind(updateUserController));
// router.use("/user",apiSuperAdmin, usersRouter);


module.exports = router;



