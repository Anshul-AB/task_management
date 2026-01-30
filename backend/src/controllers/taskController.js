import { db } from "../config/firebase.js";
import admin from "firebase-admin";

export const createTask = async (req, res) => {
  const { title, description, assignedUserId } = req.body;

  const task = {
    title,
    description,
    status: "Pending",
    assignedUserId,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await db.collection("tasks").add(task);
  res.status(201).json({ message: "Task created" });
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assignedUserId } = req.body;

    if (!title || !assignedUserId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await db.collection("tasks").doc(id).update({
      title,
      description,
      assignedUserId,
      updatedAt: new Date(),
    });

    res.json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update task" });
  }
};



export const getTasks = async (req, res) => {
  let query = db.collection("tasks");

  if (req.user.role === "user") {
    query = query.where("assignedUserId", "==", req.user.uid);
  }

  const snapshot = await query.get();
  const tasks = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.json(tasks);
};

export const updateStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  await db.collection("tasks").doc(id).update({ status });
  res.json({ message: "Status updated" });
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const taskRef = db.collection("tasks").doc(id);
    const taskSnap = await taskRef.get();

    if (!taskSnap.exists) {
      return res.status(404).json({ message: "Task not found" });
    }

    await taskRef.delete();

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete task error:", err);
    res.status(500).json({ message: "Failed to delete task" });
  }
};

