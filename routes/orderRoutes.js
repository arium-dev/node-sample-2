import express from "express";
import {
  addToCart,
  getAllOredrItems,
  getAllOrders,
  getOrderItemById,
  saveOrder,
  stripePayment,
  safePay,
} from "../controller/orderController.js";
import verifyTokens from "../middleware/index.js";
const orderRoute = express.Router();

orderRoute
  .post("/add-to-cart", addToCart)
  .get("/get-order-items", getAllOredrItems)
  .get("/get-orders", getAllOrders)
  .post("/payment-create", verifyTokens, stripePayment)
  .post("/create", saveOrder)
  .get("/get-order/:id", getOrderItemById)
  .post("/safepay", safePay)
export default orderRoute;
