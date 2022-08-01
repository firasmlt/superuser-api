const mongoose = require("mongoose");
const validator = require("validator");

const SuperuserSchema = mongoose.Schema({
  firstName: {
    type: String,
    lowercase: true,

    required: [true, "firstName field is required"],
  },
  lastName: {
    type: String,
    lowercase: true,

    required: [true, "lastName field is required"],
  },
  email: {
    type: String,
    required: [true, "email field is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "invalid email"],
  },
  number: {
    type: String,
    required: [true, "number field is required"],
    unique: true,
  },
  company: {
    lowercase: true,

    type: String,
    required: [true, "company field is required"],
  },
  answers: {
    lowercase: true,
    type: Array,
  },
});

module.exports = mongoose.model("Superuser", SuperuserSchema);
