const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const CompanySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name field is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email field is required"],
    validate: [validator.isEmail, "invalid email"],
    unique: true,
  },
  questions: {
    type: Array,
    default: ["this is default question 1", "this is default question 2"],
  },
  password: {
    type: String,
    required: [true, "password field is required"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "passwordConfirm field is required"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwordConfirm error",
    },
  },
});

CompanySchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

module.exports = mongoose.model("Company", CompanySchema);
