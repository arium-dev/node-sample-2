import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controller/productController.js";
import upload from "../middleware/multer.js";

const productsRoute = express.Router();

productsRoute.post("/add", [upload.array("images"), function (req, res, next) {
  // if (!req.files || req.files.length < 3) {
  //   return res.status(400).json({ message: 'Minimum three images are required.' });
  // }
  next();
}], createProduct)

  .get("/get-products", getAllProducts)
  .get("/get-product/:id", getSingleProduct)
  .delete("/delete/:id", deleteProduct)
  .put("/update/:id", [function (req, res, next) {
    upload.array("images")(req, res, function (err) { 
      if (err) {
        return res.status(400).send({ message: err.message });
      }
      next();
    });
  }], updateProduct);
export default productsRoute;
