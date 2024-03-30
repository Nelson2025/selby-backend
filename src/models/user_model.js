const { Schema, model } = require("mongoose");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  id: { type: String, unique: true },
  name: { type: String, default: "" },
  email: { type: String, lowercase: true, default: "" },
  isEmailVerified: { type: Boolean, default: false },
  password: { type: String, default: "" },
  phone: { type: String, unique: true, required: true },
  isPhoneVerified: { type: Boolean, default: true },
  about: { type: String, default: "" },
  avatar: { type: String, default: "" },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  pincode: { type: String, default: "" },
  profileProgress: { type: Number, default: 1 },
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

userSchema.pre("save", function (next) {
  this.id = uuid.v1();
  this.updatedOn = new Date();
  this.createdOn = new Date();

  // Hash the password
  //   const salt = bcrypt.genSaltSync(10);
  //   const hash = bcrypt.hashSync(this.password, salt);
  //   this.password = hash;

  next();
});

userSchema.pre(["update", "findOneAndUpdate", "updateOne"], function (next) {
  const update = this.getUpdate();
  delete update._id;
  delete update.id;

  this.updatedOn = new Date();

  next();
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
