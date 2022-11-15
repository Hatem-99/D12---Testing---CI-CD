import express from "express";
import createHttpError from "http-errors";
import productsSchema from "./model.js";

const productsRouter = express.Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = new productsSchema(req.body);
    const { _id } = await newProduct.save();

    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await productsSchema.find();
    res.send(products);
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const product = await productsSchema.findById(req.params.productId);
    if (product) {
      res.send(product);
    } else {
      next(
        createHttpError(404, `Product with id ${req.params.productId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});
productsRouter.put("/:productId", async (req, res, next) => {
  try {
    const updatedProduct = await productsSchema.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedProduct) {
      res.send(updatedProduct);
    } else {
      next(
        createHttpError(404, `Product with id ${req.params.productId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});
productsRouter.delete("/:productId", async (req, res, next) => {
  try {
    const deletedProduct = await productsSchema.findByIdAndDelete(req.params.productId);
    if (deletedProduct) {
      res.status(204).send();
    } else {
      next(
        createHttpError(404, `Product with id ${req.params.productId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

export default productsRouter;