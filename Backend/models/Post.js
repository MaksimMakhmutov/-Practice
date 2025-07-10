const mongoose = require("mongoose");
const roles = require("../constants/roles");
const validator = require("validator");

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        massage: "Image should ba a valid url",
      },
    },
    content: {
      type: String,
      required: true,
    },
    commets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
