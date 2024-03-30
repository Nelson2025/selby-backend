const { Schema, model } = require("mongoose");

const autosSchema = new Schema({
  // id: { type: String, unique: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  brand: { type: String, default: "" },
  model: { type: String, default: "" },
  variant: { type: String, default: "" },
  year: { type: String, default: "" },
  fuel: { type: String, default: "" },
  transmission: { type: String, default: "" },
  kms: { type: String, default: "" },
  owner: { type: String, default: "" },
  title: { type: String, required: [true, "Title is Required"] },
  description: { type: String, default: "" },
  price: { type: String, required: true },
  image: { type: Array, default: [] },
  landmark: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  status: { type: Boolean, default: Boolean },
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

autosSchema.pre("save", function (next) {
  this.updatedOn = new Date();
  this.createdOn = new Date();

  next();
});

autosSchema.pre(["update", "findOneAndUpdate", "updateOne"], function (next) {
  const update = this.getUpdate();
  delete update._id;

  this.updatedOn = new Date();

  next();
});

const AutosModel = model("Autos", autosSchema);

module.exports = AutosModel;
