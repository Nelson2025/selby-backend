const { Schema, model } = require("mongoose");

const propertiesSchema = new Schema({
  // id: { type: String, unique: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  type: { type: String, default: "" },
  bedrooms: { type: String, default: "" },
  bathrooms: { type: String, default: "" },
  furnishing: { type: String, default: "" },
  constructionStatus: { type: String, default: "" },
  listedBy: { type: String, default: "" },
  superBuiltupArea: { type: String, default: "" },
  carpetArea: { type: String, default: "" },
  maintenanceMonthly: { type: String, default: "" },
  totalFloors: { type: String, default: "" },
  floorNo: { type: String, default: "" },
  carParking: { type: String, default: "" },
  facing: { type: String, default: "" },
  projectName: { type: String, default: "" },
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

propertiesSchema.pre("save", function (next) {
  this.updatedOn = new Date();
  this.createdOn = new Date();

  next();
});

propertiesSchema.pre(
  ["update", "findOneAndUpdate", "updateOne"],
  function (next) {
    const update = this.getUpdate();
    delete update._id;

    this.updatedOn = new Date();

    next();
  }
);

const PropertiesModel = model("Properties", propertiesSchema);

module.exports = PropertiesModel;
