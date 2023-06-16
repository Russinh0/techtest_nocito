import express from "express";
import { register, find, edit, login } from "../controllers/userController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", find);
router.put("/", edit);

export default router;
