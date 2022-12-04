import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  EMAIL_IS_ALREADY_EXISTS,
  EMAIL_IS_NOT_VALID,
  PASSWORD_NOT_INCORRECT,
  PHONE_IS_ALREADY_EXISTS,
  PHONE_IS_NOT_VALID,
  USERNAME_DOES_NOT_EXISTS,
  USERNAME_IS_ALREADY_EXISTS,
} from "../constant/validMessage";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS } from "../constant/appConstant";
import { isValidEmail, isValidPhone } from "../utils/isValid";
const Users = require("../models/userModels");

const UserController = {
  register: async (req, res) => {
    try {
      const { fullname, username, phone, email, gender, password } = req.body;
      let newUserName = username.toLowerCase().replace(/ /g, "");

      const user_name = await Users.findOne({ username: newUserName });
      if (user_name) return res.status(400).json({ message: USERNAME_IS_ALREADY_EXISTS });

      const user_phone = await Users.findOne({ phone: phone });
      if (isValidPhone(user_phone)) return res.status(400).json({ message: PHONE_IS_NOT_VALID });
      if (user_phone) return res.status(400).json({ message: PHONE_IS_ALREADY_EXISTS });

      const user_email = await Users.findOne({ email: email });
      if (isValidEmail(user_email)) return res.status(400).json({ message: EMAIL_IS_NOT_VALID });
      if (user_email) return res.status(400).json({ message: EMAIL_IS_ALREADY_EXISTS });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullname,
        username: newUserName,
        phone,
        email,
        gender,
        password: passwordHash,
      });
      await newUser.save();
      return res.json({ message: REGISTER_SUCCESS, newUser });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await Users.findOne({ username });
      if (!user) return res.status(400).json({ message: USERNAME_DOES_NOT_EXISTS });
      const deCodePassword = await bcrypt.compare(password, user.password);
      if (!deCodePassword) return res.status(400).json({ message: PASSWORD_NOT_INCORRECT });

      const access_token = createAccessToken({ id: user.id });
      const refresh_token = createRefreshToken({ id: user.id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      res.json({
        message: LOGIN_SUCCESS,
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },

  logout: (res, req) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.status(500).json({ message: LOGOUT_SUCCESS });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = UserController;
