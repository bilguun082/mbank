const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  birthday: { type: String },
  status: { type: String, default: "active" },
  password: { type: String },
  userTypes: { type: String, default: "user" },
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;
