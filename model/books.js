const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: [3, "MORE THAN 3 ALPHABETS"],
      maxlength: [100, "NOT MORE THAN 100 CHARECTERS"],
    },
    auther: {
      type: String,
      trim: true,
      minlength: [3, "MORE THAN 3 ALPHABETS"],
      maxlength: [100, "NOT MORE THAN 100 CHARECTERS"],
    },
    edition: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
    },
    publisher: {
      type: String,
      trim: true,
      minlength: [3, "MORE THAN 3 ALPHABETS"],
      maxlength: [100, "NOT MORE THAN 100 CHARECTERS"],
    },
    publishedYear: {
      type: String,
      trim: true,
      minlength: [3, "MORE THAN 3 ALPHABETS"],
      maxlength: [100, "NOT MORE THAN 100 CHARECTERS"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    issued: {
      type: Boolean,
      default: false,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("book", bookSchema);
