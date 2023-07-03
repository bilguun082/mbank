const Users = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  const users = await Users.find();
  res.status(200).json({
    message: "success",
    data: users,
  });
};

exports.getUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await Users.findById(_id);
    res.status(200).json({
      message: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      data: error,
    });
  }
};

exports.createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);
  try {
    const user = await Users.create({
      name: req.body.name,
      email: req.body.email,
      birthday: req.body.birthday,
      password: hashed,
      userTypes: req.body.userType,
    });
    res.status(200).send({ message: "created successfully", user });
  } catch (error) {
    res.status(400).json({
      message: "error",
      data: error,
    });
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email: email });
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        {
          email: user.email,
        },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        {
          email: user.email,
        },
        process.env.REFRESH_TOKEN_KEY,
        { expiresIn: "7d" }
      );
      res.status(200).json({
        email: user.email,
        match: match,
        id: user._id,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.status(400).json({ message: "invalid credentials" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.Logout = async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).json({ message: "Failed to logout" });
      } else {
        res.status(200).json({ message: "Logout successful" });
        res.direct("/mtest/pages/login.js");
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout" });
  }
};

exports.token = async (req, res) => {
  const token = req?.params?.id;
  if (!token) {
    return res.status(404).json({
      message: "Invalid token",
    });
  }
  const data = await jwt.decode(token, process.env.ACCESS_TOKEN_KEY);
  console.log(data);
  res.status(200).json(data);
};

exports.updateUser = async (request, response) => {
  const _id = request.params.id;
  const updatedList = request.body;
  try {
    const data = await Users.findByIdAndUpdate({ _id }, updatedList);
    response.status(200).send({ message: "Updated", data: data });
  } catch (error) {
    response.status(400).send(error.message);
  }
};
exports.deleteUser = async (request, response) => {
  const _id = request.params.id;
  try {
    const data = await Users.findByIdAndDelete({ _id });
    response.send({ message: "Deleted", data: data });
  } catch (error) {
    response.status(400).send(error.message);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    const user = await Users.findOne({ email: decodedToken.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
