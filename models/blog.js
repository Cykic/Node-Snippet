const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// SCHEMA IS LIKE A BLUEPRINT FOR WHAT WILL BE STORED IN THE DOCUMENT
///////////////////////////////////////////////////////////////////////

const schemaOptions = { timestamps: true };
const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    snippet: { type: String, required: true },
    body: { type: String, required: true },
  },
  schemaOptions
);

const BlogModel = mongoose.model("blog", blogSchema); // 1st argument should be singular of the collection in MongoDB
module.exports = BlogModel;
