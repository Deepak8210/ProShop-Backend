import express from "express";
const uploadRoute = express.Router();
import storage from "../config/cloudinary.js";
import multer from "multer";

const upload = multer({
  storage,
});

uploadRoute.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image Uploaded",
    image: req.file.path,
  });
});

export default uploadRoute;
