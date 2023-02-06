import express from "express";
import { LOGIN_API_URL, LOGOUT_API_URL, REFRESH_TOKEN, REGISTER_API_URL } from "../constant/apiConstant";
const userController = require("../controllers/userController");
const userValidator = require("../middleware/schemeValidatetors/userValidate");
const router = express.Router();

// register user
// ("/path api", middleware, redirect to)
router.post(REGISTER_API_URL, userValidator.registerUser, userController.register);

// login user
router.post(LOGIN_API_URL, userController.login);

// logout user
router.get(LOGOUT_API_URL, userController.logout);

// refresh token
router.get(REFRESH_TOKEN, userController.refreshToken);

module.exports = router;
