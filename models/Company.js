const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  questions: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Company", CompanySchema);
