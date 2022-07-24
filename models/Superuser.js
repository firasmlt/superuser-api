const mongoose = require("mongoose");

const SuperuserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  number:{
    type:String,
    required:true,
    unique:true,
  },
  company:{
    type:String,
    required:true
  },
  answers:{
    type:Array,
  }
});

module.exports = mongoose.model("Superuser", SuperuserSchema);