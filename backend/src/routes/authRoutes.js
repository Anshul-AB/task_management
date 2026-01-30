import express from "express";
import { signup, login, getUsers } from "../controllers/authController.js";
import { auth, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", auth, adminOnly, getUsers);


export default router;
