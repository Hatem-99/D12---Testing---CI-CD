import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productsSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("product", productsSchema);