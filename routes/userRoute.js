import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  authUserCtrl,
  logoutCtrl,
  registerCtrl,
  getUserProfileCtrl,
  updateUserProfileCtrl,
  getAllUsersCtrl,
  getUserByIdCtrl,
  deleteUser,
  updateUser,
} from "../controllers/userCtrl.js";

const userRoute = express.Router();

userRoute.route("/").post(registerCtrl).get(protect, admin, getAllUsersCtrl);
userRoute.post("/logout", logoutCtrl);
userRoute.post("/login", authUserCtrl);

userRoute
  .route("/profile")
  .get(protect, getUserProfileCtrl)
  .put(protect, updateUserProfileCtrl);
userRoute
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserByIdCtrl)
  .put(protect, admin, updateUser);

export default userRoute;
