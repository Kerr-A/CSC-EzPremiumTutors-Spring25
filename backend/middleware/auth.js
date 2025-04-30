import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  return res.status(401).json({ message: "No token provided" });
};
