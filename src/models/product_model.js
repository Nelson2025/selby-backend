const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  // id: { type: String, unique: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  subcategoryId: { type: String, default: "" },
  userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  features: { type: Array, default: [] },
  title: { type: String, required: [true, "Title is Required"] },
  description: { type: String, default: "" },
  price: { type: String, required: true },
  image: { type: Array, default: [] },
  //   landmark: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  favourite: { type: String, default: "NO" },
  status: { type: String, default: "Active" },
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

productSchema.pre("save", function (next) {
  this.updatedOn = new Date();
  this.createdOn = new Date();

  next();
});

productSchema.pre(["update", "findOneAndUpdate", "updateOne"], function (next) {
  const update = this.getUpdate();
  delete update._id;

  this.updatedOn = new Date();

  next();
});

const ProductModel = model("Products", productSchema);

module.exports = ProductModel;
