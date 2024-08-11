import express from "express";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../controller/categoryController.js";
import upload from "../middleware/multer.js";

const categoryRoute = express.Router();
categoryRoute.post("/add", upload.single("image"), createCategory)
.get("/get-category",getAllCategories)
.put("/update/:id",upload.single("image"),updateCategory)
.delete("/delete/:id",deleteCategory)

export default categoryRoute;