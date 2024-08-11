import dotenv from "dotenv";
import randomstring from "randomstring";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../helper/sendEmail.js";
dotenv.config();
const secret = process.env.SECRET;

export const authRegister = async (req, res) => {
  try {
    const check = await User.findOne({ email: req.body.email });

    if (check) {
      return res.status(400).json({ code: 400, message: "Email already exists." });
    }

    let hashPassword = bcrypt.hashSync(req.body.password, 8);

    const newUser = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashPassword,
      token: req.body.token,
    });

    if (newUser) {
      return res.status(200).json({
        user: newUser,
        code: 200,
        message: "User created successfully",
      });
    } else {
      return res.status(400).json({ code: 400, message: "User creation failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: "Internal server error." });
  }
};

export const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ code: 400, message: "Incorrect email." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        secret,
        { expiresIn: "24h" }
      );

      return res.status(200).json({
        code: 200,
        message: "Login Successfully.",
        token,
        userInfo: user,
      });
    } else {
      return res.status(400).json({ code: 400, message: "Incorrect password." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Internal server error." });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (user) {
      const randomToken = randomstring.generate();
      user.token = randomToken;
      await user.save();

      sendEmail(user.email, randomToken);

      return res.status(200).json({
        code: 200,
        user: user,
        message: "Please check your inbox.",
      });
    } else {
      return res.status(400).json({ code: 400, message: "Sorry, user does not exist." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: "Internal server error." });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const token = req.body.token;
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(400).json({ code: 400, message: "Token does not exist." });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    user.password = hashedPassword;
    user.token = null;
    await user.save();

    return res.status(200).json({ code: 200, message: "Password updated successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: "Internal server error." });
  }
};


export const loginWithGoogle = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        secret,
        { expiresIn: 86400 }
      );

      return res.status(200).json({
        code: 200,
        message: "Login Successfully.",
        token: token,
        userInfo: user,
      });
    } else {
      throw { code: 400, message: "User does not exist." };
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: "Internal server error." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      throw { code: 404, message: "users not found" };
    }
    return res.status(200).json({
      code: 200,
      message: "users found",
      users: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

export const removeUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      return res.status(200).json({
        code: 200,
        message: "Successfully deleted conversation",
        data: deletedUser,
      });
    } else {
      throw { code: 404, message: "Conversation not found" };
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const { isActive } = req.body;
    const existingUser = await User.findOne({ _id });
    if (!existingUser) {
      throw { code: 404, message: "User not found." };
    }
    if (isActive !== undefined) {
      existingUser.isActive = isActive;
    }
    const updatedUser = await existingUser.save();
    return res.status(200).json({
      user: updatedUser,
      code: 200,
      message: "User updated successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Internal server error." });
  }
};

