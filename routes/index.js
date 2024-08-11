import express from "express";
import authRoute from "./authRoutes.js";
import productsRoute from "./productRoutes.js";
import billingRoute from "./orderRoutes.js";
import guestUserRoute from "./guestUserRoutes.js";
import colorRoute from "./colorRoutes.js";
import orderRoute from "./orderRoutes.js";
import categoryRoute from "./categoryRoutes.js";
const router = express.Router();
router.use("/auth", authRoute);
router.use("/product", productsRoute);
router.use("/order", orderRoute);
router.use("/guestUser", guestUserRoute);
router.use("/color",colorRoute)
router.use("/category",categoryRoute)
export default router;
