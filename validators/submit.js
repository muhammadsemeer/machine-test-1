module.exports = {
  submit: (req, res, next) => {
    let body = req.body;
    let isPassed = body.every((item) => {
      let isAllPresent =
        item.hasOwnProperty("google_id") &&
        item.hasOwnProperty("package_name") &&
        item.hasOwnProperty("package_name") &&
        item.hasOwnProperty("package_installed_at") &&
        item.hasOwnProperty("client_ip");
      return isAllPresent;
    });
    if (isPassed) {
      next();
    } else {
      next({ status: 400, message: "Invalid request" });
    }
  },
};
