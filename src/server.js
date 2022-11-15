import express from "express";
import cors from "cors";
import {
  badRequestErrorHandler,
  forbiddenErrorHandler,
  genericErrorHandler,
  notFoundErrorHandler,
  unauthorizedErrorHandler,
} from "./errorHandling.js";

import productsRouter from "./api/products/index.js";

const server = express();

server.use(cors());
server.use(express.json());

server.use("/products", productsRouter);

server.use(badRequestErrorHandler);
server.use(unauthorizedErrorHandler);
server.use(forbiddenErrorHandler);
server.use(notFoundErrorHandler);
server.use(genericErrorHandler);

export default server;
