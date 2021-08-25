const Table1 = require("../model/table1");

module.exports = {
  submit: (data) => {
    return new Promise((resolve, reject) => {
      Table1.bulkCreate(data)
        .then((res) => {
          resolve({
            result: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          reject({
            result: "failed",
          });
        });
    });
  },
};
