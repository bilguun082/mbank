const express = require("express");
const {
  getUsers,
  getUser,
  Login,
  createUser,
  token,
  updateUser,
  deleteUser,
} = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controller/userController");

const userRouter = express.Router();

userRouter
  .get("/", getUsers)
  .get("/:id", getUser)
  .get("/token/:id", token)
  .get("/profile", authMiddleware, userController.getProfile)
  .post("/create", createUser)
  .post("/login", Login)
  .put("/update/:id", updateUser)
  .delete("/delete/:id", deleteUser);

module.exports = userRouter;
