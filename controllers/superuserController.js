const Superuser = require("../models/Superuser");

exports.getUser = async (req, res, next) => {
  try {
    const data = await Superuser.findById("hedfsa");
    if (data) return res.status(200).json(data);
    res.status(404).json({ message: "not found" });
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
        if (!doc) res.status(404).json({ message: err });
        res.status(200).json(doc);
      }
    );
  } catch (err) {
    next(err);
  }
};
