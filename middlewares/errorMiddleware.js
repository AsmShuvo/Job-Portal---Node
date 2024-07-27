const errorMiddleware = (err, req, res, next) => {
  console.log("Error in middle ware: ", err);
  res.status(500).send({
    success: false,
    message: "Something went wrong",
    err,
  }); 
};

module.exports = errorMiddleware;
