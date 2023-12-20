import express from "express";
import {
  productsCtrl,
  singleProductCtrl,
  createProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
  createProductReviewCtrl,
  getTopProductsCtrl,
} from "../controllers/productsCtrl.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const productRoute = express.Router();

productRoute
  .route("/")
  .get(productsCtrl)
  .post(protect, admin, createProductCtrl);
productRoute.get("/top", getTopProductsCtrl);
productRoute
  .route("/:id")
  .get(singleProductCtrl)
  .put(protect, admin, updateProductCtrl)
  .delete(protect, admin, deleteProductCtrl);
productRoute.route("/:id/reviews").post(protect, createProductReviewCtrl);

export default productRoute;
