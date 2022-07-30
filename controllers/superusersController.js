const Superuser = require("../models/superuserModel");
const AppError = require("../utils/appError");
const checkCompany = (currentCompany, reqComp, next) => {
  if (currentCompany !== reqComp) return false;
  return true;
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const data = await Superuser.find({ company: req.company.name });
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
    const user = await Superuser.findOne({ _id: req.params.id });
    if (!user) return next(new AppError("user not updated", 400));
    if (!checkCompany(user.company, req.company.name, next))
      return next(new AppError("not authorized", 401));

    user.answers = req.body.answers;
    user.save();
    res.send({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const data = await Superuser.findById(req.params.id);
    if (!data) return next(new AppError("No User Found with that id", 404));
    if (!checkCompany(data.company, req.company.name, next))
      return next(new AppError("not authorized", 401));
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

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await Superuser.findOne({ _id: req.params.id });
    if (!user) return next(new AppError("user not found", 404));
    if (!checkCompany(user.company, req.company.name, next))
      return next(new AppError("not authorized", 401));
    await Superuser.findByIdAndDelete(user._id);
    res.status(200).json({
      status: "success",
      message: "superuser deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
