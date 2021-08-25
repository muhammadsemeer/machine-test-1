const router = require("express").Router(),
  validator = require("../validators/submit"),
  handler = require("../handlers/table1");

router.post("/submit", validator.submit, (req, res, next) => {
  handler
    .submit(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => next(err));
});

module.exports = router;
