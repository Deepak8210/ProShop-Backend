import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //read jwt from cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, Token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, No Token Found");
  }
});

//admin middleware
const admin = asyncHandler(async (req, res, next) => {
  if (req.user.isAdmin) next();
  else {
    res.status(401);
    throw new Error("Not Authorized, as Admin");
  }
});

export { protect, admin };
