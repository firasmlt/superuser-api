const Superuser = require("../models/superuserModel");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");

const checkCompany = (currentCompany, reqComp, next) => {
  if (currentCompany !== reqComp) return false;
  return true;
};

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
    await sendEmail({
      email: data.email,
      subject: "Welcome to superusers",
      message: `Welcome ${firstName},\n this is a test email `,
    });
    res.json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.addAnswer = async (req, res, next) => {
  try {
    const user = await Superuser.findOne({ _id: req.params.id });
    if (!user) return next(new AppError("no user found", 404));

    let newAnswers = [];
    if (user.answers) newAnswers = user.answers;
    newAnswers.push(req.body.answer);
    user.answers = newAnswers;
    user.save();
    res.send({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await Superuser.findOne({ _id: req.params.id });
    if (!user) return next(new AppError("no user found", 404));
    if (!checkCompany(user.company, req.company.name, next))
      return next(new AppError("not authorized", 401));
    if (req.body.firstName) {
      user.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      user.lastName = req.body.lastName;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.number) {
      user.number = req.body.number;
    }
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
