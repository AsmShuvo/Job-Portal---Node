const testMiddleware = (req, res, next) => {
  console.log("testing middle ware ");
  res.status(500).send({
    success: false,
    message: "testing midmmdleware",
  });
};

module.exports = testMiddleware;
