import jwt from "jsonwebtoken";
const JWT_SECRET = "SUPER_SECRET_KEY";

export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  req.user = jwt.verify(token, JWT_SECRET);
  next();
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  next();
};
