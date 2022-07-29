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
    select: false,
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
  passwordChangedAt: Date,
});

CompanySchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

CompanySchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

CompanySchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return changedTimestamp > JWTTimestamp;
  }
  return false;
};

module.exports = mongoose.model("Company", CompanySchema);
