import express from "express";
import {
    forgotPassword,
    login,
    logout,
    register,
    resetPassword,
    updatePassword,
} from "../controllers/AuthController.js";
import { protect } from "../middleware/AuthMiddleware.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/register", register);
AuthRoutes.post("/login", login);
AuthRoutes.get("/logout", protect, logout);
AuthRoutes.post("/forgotpassword", forgotPassword);
AuthRoutes.put("/resetpassword/:resettoken", resetPassword);
AuthRoutes.post("/updatepassword", protect, updatePassword);

export default AuthRoutes;
