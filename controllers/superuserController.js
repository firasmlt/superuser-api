const Superuser = require("../models/Superuser");
const AppError = require("../utils/appError");

exports.getUser = async (req, res, next) => {
  try {
    const data = await Superuser.findById(req.params.id);
    if (!data) return next(new AppError("No User Found with that id", 404));
    res.status(200).json({
      status: "success",
      data: {
        superuser: data,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    Superuser.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      -{ new: true },
      (err, doc) => {
        if (!doc) return next(new AppError("user not updated!", 400));
        res.status(200).json({
          status: "success",
          data: doc,
        });
      }
    );
  } catch (err) {
    next(err);
  }
};
