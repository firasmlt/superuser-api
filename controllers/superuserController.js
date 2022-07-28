const Superuser = require("../models/Superuser");

exports.getUser = async (req, res) => {
  const data = await Superuser.findById(req.params.id);
  try {
    if (data) return res.status(200).json(data);
    res.status(404).json({ message: "not found" });
  } catch (err) {
    res.status(404).json({ message: "not found" });
  }
};

exports.updateUser = async (req, res) => {
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
    res.status(500).json({ message: err });
  }
};
