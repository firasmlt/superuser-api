const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
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
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
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

CompanySchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

CompanySchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
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

CompanySchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("Company", CompanySchema);
