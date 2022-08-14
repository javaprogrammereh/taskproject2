const config = require("../../../config");
const express = require("express");
const { Router } = require("express");

const router = new Router();

//*middleware
const apiSuperAdmin = require(`${config.path.middleware}/superAdmin/apiSuperAdmin`);
const apiWho = require(`${config.path.middleware}/who`);


//*user
const { user: userController } = config.path.controllersApi.v1;

//*file
const createController = require(`${userController}/file/createController`);
const indexController = require(`${userController}/file/indexController`);
const getFileController = require(`${userController}/file/getFileController`);

const fileRouter = express.Router();
fileRouter.post("/create", createController.create.bind(createController));
fileRouter.get("/index/:id", indexController.index.bind(indexController));
fileRouter.post("/getFile/:id", getFileController.getFile.bind(getFileController));
router.use("/file",apiWho, fileRouter);

module.exports = router;
