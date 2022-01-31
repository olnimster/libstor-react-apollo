const { model, Schema } = require("mongoose");

const usersSchema = new Schema({
  publicName: String,
  password: String,
  email: String,
  createdAt: String,
  username: String,
  avatar: String,
  follow: [{ publicName: String }],
  writer: Boolean,
  bookshelf: [
    {
      bookId: String,
      createdAt: String,
    },
  ],
  uploadedFiles: [
    {
      docType: String,
      filename: String,
    },
  ],
});

module.exports = model("users", usersSchema);
