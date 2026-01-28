import { db } from "../config/firebase.js";

export const createTask = async (req, res) => {
  const { title, description, assignedUserId } = req.body;

  const task = {
    title,
    description,
    status: "Pending",
    assignedUserId,
    createdAt: new Date(),
  };

  await db.collection("tasks").add(task);
  res.status(201).json({ message: "Task created" });
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
