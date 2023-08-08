const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [3, "Minimum length of name should Be 3"],
      maxlength: [30, "Maximum length of name should Be 30"],
    },
    email: {
      type: String,
      includes: "@",
    },
    gender: {
      type: String,
      minlength: [3, "Please Enter valid gender"],
      maxlength: [15, "Please Enter valid gender"],
    },
    contact: {
      type: String,
      minlength: [10, "Please Enter Valid Number"],
      maxlength: [10, "Please Enter valide Number"],
    },
    age: {
      type: Number,
      minsize: [10, "Minimum Age is 10"],
      minsize: [100, "Maximum Age is 100"],
    },
    address: {
      type: String,
      // minlength: [10, "Minimum Length Is 10"],
      // maxlength: [100, "Maximum Length Is 100"],
    },
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

const useModel = mongoose.model("users", userSchema);
module.exports = useModel;