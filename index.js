const express = require("express"),
  app = express(),
  db = require("./config/connection"),
  logger = require("morgan");

require("./model/table1");

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(logger("dev"));

// ROUTES
app.use("/v2", require("./routes/v2"));

// Catching 404 errors
app.use((req, res) => {
  res.sendStatus(404);
});

// Catching errors
app.use((err, req, res, next) => {
  const { status, ...rest } = err;
  res.status(status || 500).json(rest || { result: "Internal Server Error" });
});

const PORT = process.env.PORT || 3001;

db.sync()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to database");
    console.log(err);
  });
