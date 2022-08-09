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

const fileRouter = express.Router();
fileRouter.post("/create", createController.create.bind(createController));
fileRouter.get("/index/:id", indexController.index.bind(indexController));
router.use("/file", fileRouter);

module.exports = router;
