import express from "express";
import { LOGIN_API_URL, LOGOUT_API_URL, REGISTER_API_URL } from "../constant/apiConstant";
const userController = require("../controllers/userController");
const router = express.Router();

router.post(REGISTER_API_URL, userController.register);
router.post(LOGIN_API_URL, userController.login);
router.post(LOGOUT_API_URL, userController.logout);

module.exports = router;
