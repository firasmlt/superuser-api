const Superuser = require("../models/superuserModel");
const AppError = require("../utils/appError");

exports.getAllUsers = async (req, res, next) => {
  try {
    const data = await Superuser.find();
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.postUser = async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const number = req.body.number;
  const company = req.body.company;
  const answers = req.body.answers;

  try {
    const superuser = new Superuser({
      firstName,
      lastName,
      email,
      number,
      company,
      answers,
    });
    const data = await superuser.save();
    if (!data) return next(new AppError("no data found!", 404));
    res.json({
      status: "success",
      data,
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
