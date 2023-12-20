import express from "express";
import {
  addOrderItemsCtrl,
  getMyOrdersCtrl,
  getOrderByIdCtrl,
  updateOrderToPaidCtrl,
  updateOrderToDeliveredCtrl,
  getOrdersCtrl,
} from "../controllers/orderCtrl.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const orderRoute = express.Router();

orderRoute
  .route("/")
  .post(protect, addOrderItemsCtrl)
  .get(protect, admin, getOrdersCtrl);

orderRoute.route("/mine").get(protect, getMyOrdersCtrl);

orderRoute.route("/:id").get(protect, getOrderByIdCtrl);

orderRoute.route("/:id/pay").put(protect, updateOrderToPaidCtrl);

orderRoute
  .route("/:id/deliver")
  .put(protect, admin, updateOrderToDeliveredCtrl);

export default orderRoute;
