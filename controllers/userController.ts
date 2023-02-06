import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  EMAIL_IS_ALREADY_EXISTS,
  PASSWORD_NOT_INCORRECT,
  PHONE_IS_ALREADY_EXISTS,
  USERNAME_DOES_NOT_EXISTS,
  USERNAME_IS_ALREADY_EXISTS,
} from "../constant/validMessage";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS } from "../constant/appConstant";
const Users = require("../models/userModels");

const UserController = {
/**
 * create a new user
 * declare variables for the user
 * check if the user already exists return false
 * if the user not exists return true and save to the database
 */

  register: async (req, res) => {
    try {
      const { fullname, username, phone, email, gender, password } = req.body;
      let newUserName = username.toLowerCase().replace(/ /g, "");

      const user_name = await Users.findOne({ username: newUserName });
      if (user_name) return res.status(400).json({ message: USERNAME_IS_ALREADY_EXISTS });

      const user_phone = await Users.findOne({ phone: phone });
      if (user_phone) return res.status(400).json({ message: PHONE_IS_ALREADY_EXISTS });

      const user_email = await Users.findOne({ email: email });
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

  /**
   * login user
   * declare variables get user name and password
   * check if user is already exists create new token return true and user information
   * if user is not already exist return false
   */

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

  logout: async (req, res) =>{
    try {
        res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
        return res.json({ message: LOGOUT_SUCCESS })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

  refreshToken: (req, res) =>{
    try {
        const rf_token = req.cookies.refreshtoken;
        if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
            if(err) return res.status(400).json({msg: "Please Login or Register"})

            const accesstoken = createAccessToken({id: user.id})

            res.json({accesstoken})
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
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
