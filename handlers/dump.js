const { spawn } = require("child_process"),
  fs = require("fs"),
  AWS = require("aws-sdk");

require("dotenv").config();

// AWS SDK Configuration
AWS.config.update({
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
  signatureVersion: "v4", //API version
});

module.exports = () => {
  let date = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).toDateString();
  const dumpFileName = `./dump/${date}.sql`;
  const writeStream = fs.createWriteStream(dumpFileName);
  let dump = spawn("mysqldump", [
    "-u",
    "root",
    "-p" + process.env.DB_PASS,
    process.env.DB_NAME,
  ]);

  dump.stdout
    .pipe(writeStream)
    .on("finish", function () {
      console.log(`Dump on ${date} Completed`);
      uploadToS3(dumpFileName, date);
    })
    .on("error", function (err) {
      console.log(err);
    });
};

function uploadToS3(filePath, date) {
  const s3 = new AWS.S3({ signatureVersion: "v4" });
  fs.readFile(filePath, (err, fileBody) => {
    if (err) {
      console.log("Error", err);
    } else {
      let params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${date}.sql`,
        Body: fileBody,
      };
      s3.upload(params, (err, result) => {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Uploaded to S3");
        }
      });
    }
  });
}