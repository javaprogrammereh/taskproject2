const config = require("../../../config");
const express = require("express");
const { Router } = require("express");

const router = new Router();

//*middleware

//*user
const { user: userController } = config.path.controllersApi.v1;

//*file
const createController = require(`${userController}/file/createController`);
const indexController = require(`${userController}/file/indexController`);
const recaptchaController = require(`${userController}/file/recaptchaController`);
const getFileController = require(`${userController}/file/getFileController`);

const fileRouter = express.Router();
fileRouter.post("/create", createController.create.bind(createController));
fileRouter.get("/index/:id", indexController.index.bind(indexController));
fileRouter.get("/recaptcha", recaptchaController.recaptcha.bind(recaptchaController));
fileRouter.post("/getFile/:id", getFileController.getFile.bind(getFileController));

router.use("/file", fileRouter);

module.exports = router;
