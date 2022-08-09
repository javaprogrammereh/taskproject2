const fs = require("fs");

const createDir = (dirPath) => {
  fs.mkdirSync(process.cwd() + dirPath, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("successfuly createDir...");
    }
  });
};
const createFile = (filePath, fileContent) => {
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("successfuly createFile...");
    }
  });
};

module.exports = { createDir, createFile };
