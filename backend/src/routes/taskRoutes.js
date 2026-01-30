import express from "express";
import { auth, adminOnly } from "../middleware/auth.js";
import {
  createTask,
  getTasks,
  updateStatus,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", auth, adminOnly, createTask);
router.get("/", auth, getTasks);
router.patch("/:id/status", auth, updateStatus);
router.put("/:id", auth, adminOnly, updateTask);
router.delete("/:id", auth, adminOnly, deleteTask);



export default router;
