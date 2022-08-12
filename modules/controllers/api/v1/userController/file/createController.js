const fs = require("fs");
const path = require('path');


const {createDir,createFile} =require('../../../../../helpers/fileHelper'); 

const initializeController = require("./initializeController");
module.exports = new (class createController extends initializeController {
  async create(req, res) {
    req.checkBody("userId", "کاربر نمیتواند خالی بماند").notEmpty();
    req.checkBody("title", "عنوان نمیتواند خالی بماند").notEmpty();
    req.checkBody("file", "فایل نمیتواند خالی بماند").notEmpty();
    req.checkBody("type", "نوع نمیتواند خالی بماند").notEmpty();
    req.checkBody("privateKey", "کلید نمیتواند خالی بماند").notEmpty();
    req.checkBody("format", "فرمت نمیتواند خالی بماند").notEmpty();
    if (this.showValidationErrors(req, res)) return "";
    try {
// https://www.tutorialkart.com/nodejs/create-file-in-nodejs-using-node-fs-module/
//how to create file with fs nodejs
      const values = {
        userId: req.body.userId,
        title: req.body.title,
        type: req.body.type,
        privateKey: req.body.privateKey,
        expiretime: req.body.expiretime,
      };
      await this.model.file.create(values);
      //*
      const Path = path.join(process.cwd() ,process.env.DOMAIN+req.body.title+'.'+req.body.format) ;
      // console.log(Path);
      const content =  JSON.stringify(req.body.file);
      createFile(Path, content);
      //*
      return this.ok(res, "با موفقیت ثبت شد");
    } catch (err) {
      console.log(err);
      return this.abort(res, 500);
    }
  }
})();
