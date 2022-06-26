import express from "express";
import {
    forgotPassword,
    getMe,
    login,
    logout,
    register,
    resetPassword,
    tokenValidationEnable,
    updateMe,
    updatePassword,
    uploadMyPhoto,
} from "../controllers/AuthController.js";
import { protect } from "../middleware/AuthMiddleware.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/register", register);
AuthRoutes.post("/login", login);
AuthRoutes.get("/me", protect, getMe);
AuthRoutes.put("/updateme", protect, updateMe);
AuthRoutes.put("/uploadmyphoto", protect, uploadMyPhoto);
AuthRoutes.get("/logout", protect, logout);
AuthRoutes.get("/tokenval", protect, tokenValidationEnable);
AuthRoutes.post("/forgotpassword", forgotPassword);
AuthRoutes.put("/resetpassword/:resettoken", resetPassword);
AuthRoutes.post("/updatepassword", protect, updatePassword);

export default AuthRoutes;
