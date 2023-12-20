import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//post api/users/login   //public
const authUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (userFound && (await userFound.verifyPassword(password))) {
    generateToken(res, userFound._id);

    res.status(200).json({
      _id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      isAdmin: userFound.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Inavlid Credentials");
  }
});

//post api/users/register  //public
const registerCtrl = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//post api/users/logout   //private clearing cookie
const logoutCtrl = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

//get api/users/profile  //public
const getUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//put api/users/updateprofile  //private
const updateUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//get api/users  //admin
const getAllUsersCtrl = asyncHandler(async (req, res) => {
  try {
    res.send("all user admin");
  } catch (error) {}
});

//admin get the user by id  api/users/:id
const getUserByIdCtrl = asyncHandler(async (req, res) => {
  try {
    res.send("get user by id");
  } catch (error) {}
});

//delete api/users/:id  //admin
const deleteUser = asyncHandler(async (req, res) => {
  try {
    res.send("delete user");
  } catch (error) {}
});

//admin  api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  try {
    res.send("update user by id");
  } catch (error) {}
});

export {
  authUserCtrl,
  logoutCtrl,
  registerCtrl,
  getUserProfileCtrl,
  updateUserProfileCtrl,
  getAllUsersCtrl,
  getUserByIdCtrl,
  deleteUser,
  updateUser,
};
