import {
  authLogin,
  authRegister,
  forgetPassword,
  getAllUsers,
  loginWithGoogle,
  removeUser,
  resetPassword,
  updateUser,
} from "../controller/authController.js";

import express from "express";
const authRoute = express.Router();

authRoute
  .post("/register", authRegister)
  .post("/login", authLogin)
  .post("/forgot-password", forgetPassword)
  .post("/reset-password", resetPassword)
  .post("/login-with-google", loginWithGoogle)
  .patch("/update-user/:id", updateUser)
  .get("/get-users", getAllUsers)
  .delete("/remove-user/:id", removeUser)
  .patch("/update-user/:id", updateUser)
export default authRoute;
