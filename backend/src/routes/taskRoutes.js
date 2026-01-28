import express from "express";
import { auth, adminOnly } from "../middleware/auth.js";
import {
  createTask,
  getTasks,
  updateStatus,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", auth, adminOnly, createTask);
router.get("/", auth, getTasks);
router.patch("/:id/status", auth, updateStatus);

export default router;
