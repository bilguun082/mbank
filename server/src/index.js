const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./router/userRouter");
require("dotenv").config();
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
mongoose.set("strictQuery", true);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
