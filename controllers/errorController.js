module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  //   if (err.statusCode === 500) {
  //     res.status(500).json({
  //       status: "error",
  //       message: "internal error",
  //     });
  //   } // don't forget to add else statement
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
