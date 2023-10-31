import express from "express";
const router = express.Router();
import { AuthController } from "../Controllers";

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

export default router;
