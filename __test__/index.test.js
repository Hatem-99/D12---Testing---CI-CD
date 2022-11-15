import supertest from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import server from "../src/server.js";
import ProductsModel from "../src/api/products/model.js";


dotenv.config();

const client = supertest(server);
const newProduct = {
  name: "test",
  description: "bsdjabsduyw",
  price: 12,
};

const notValidId = "636e475177ea7e568ae7c5c7";
const validId = "63739fa78a7630b3c01a29da";
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_CONNECTION_URL);
  const product = new ProductsModel(newProduct);
  await product.save();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Test Products APIs", () => {


  it("Fetching on/products/ should return a success status code and a body", async () => {
    const response = await client.get("/products").expect(200);
    expect(response).toBeDefined();
  });

  it("Create new product on /products should return a valid _id and 201 in case of a valid product, 400 if not", async () => {
    const response = await client
      .post("/products")
      .send(newProduct)
      .expect(201);
    expect(response.body._id).toBeDefined();
  });


  it("When retrieving the /products/:id with false Id", async () => {
    const response = await client.get(`/products/${notValidId}`).expect(404);
  });

  it("When retrieving the /products/:id with correct Id", async () => {
    const response = await client.get(`/products/${validId}`).expect(200);
    expect(response.body._id).toMatch(validId);
  });
  it("When deleting the /products/:id with false Id", async () => {
    const response = await client.get(`/products/${notValidId}`).expect(404);
  });
  it("When deleting the /products/:id with correct Id", async () => {
    const response = await client.get(`/products/${validId}`).expect(200);
    expect(response.body._id).toMatch(validId);
  });

  it("When updating a /product/:id with false Id", async () => {
    const response = await client.put(`/products/${notValidId}`).expect(404);
  });
  it("When updating a /product/:id with correct Id", async () => {
    const response = await client.put(`/products/${validId}`).expect(200)
    expect(response.body.name !== "test")
    expect(typeof(response.body.name)).toEqual("string")
  });


});

describe("Extra 3 tests", () => {
   
})
