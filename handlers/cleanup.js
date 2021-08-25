const mysql = require("mysql2"),
  tables = require("./tables"),
  fs = require("fs"),
  path = require("path");

const connection = mysql.createConnection({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
});

module.exports = () => {
  let today = new Date(new Date());
  let yesterday = new Date(new Date(new Date().setDate(today.getDate() - 1)));
  let todayFormatted = today.toISOString().slice(0, 10) + " 00:00:00";
  console.log(`Cleaning up data's on ${yesterday}`);
  Object.values(tables).forEach((table) => {
    connection.query(
      `DELETE FROM ${table} WHERE DATE(createdAt) < '${todayFormatted}'`,
      (err, results) => {
        if (err) throw err;
        console.log(`${table} table cleaned up`);
      }
    );
  });
  let dumpPath = path.join(
    __dirname,
    `../dump/${yesterday.toDateString()}.sql`
  );
  if (fs.existsSync(dumpPath)) {
    fs.unlink(dumpPath, (err) => {
      if (err) throw err;
      console.log(`${yesterday.toDateString()}.sql file deleted`);
    });
  }
};
