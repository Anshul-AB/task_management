import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/firebase.js";
require("dotenv").config();


const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!existing.empty)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").add({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const snapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (snapshot.empty)
      return res.status(404).json({ message: "User not found" });

    const doc = snapshot.docs[0];
    const user = doc.data();

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { uid: doc.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: doc.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUsers = async (req, res) => {
  const snapshot = await db.collection("users").get();
  const users = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.json(users);
};
