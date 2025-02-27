const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/api", (req, res) => {
  res.json({ message: "API is working!" });
});

// Auth Routes
app.use("/api/user/auth", authRoutes);

// Example Protected Route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", userId: req.user.userId });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
