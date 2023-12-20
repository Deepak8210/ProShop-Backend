import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import productRoute from "./routes/productroute.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import orderRoute from "./routes/orderRoutes.js";
import uploadRoute from "./routes/uploadRoute.js";

dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//all products route
app.use("/api/products", productRoute);

//single product route
// app.use("/api/products", productRoute);

//user Route
app.use("/api/users", userRoute);

//orders Route
app.use("/api/orders", orderRoute);

//paypal route
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

//image upload route
app.use("/api/upload", uploadRoute);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// } else {
// routes
app.get("/", (req, res) => {
  res.send("api is running");
});
// }

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("running on port", PORT);
});
