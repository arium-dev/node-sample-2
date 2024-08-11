import express from "express";
import { createColor, deleteColor, getAllColors, getColorByName, updateColor } from "../controller/colorController.js";


const colorRoute = express.Router();


colorRoute
.post("/create",createColor)
.get("/get-colors",getAllColors)
.put("/update/:id",updateColor)
.delete("/delete/:id",deleteColor)
.get('/colors/:name', getColorByName);


export default colorRoute;