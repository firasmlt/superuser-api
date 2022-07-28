const Superuser = require("../models/Superuser");

exports.getUser = async (req, res, next) => {
  try {
    const data = await Superuser.findById(req.params.id);
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
