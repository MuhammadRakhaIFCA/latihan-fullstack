import express from "express"
import upload from "../middleware/upload.js"
import { addProduct, editProduct, getUserProduct } from "../controller/productController.js";


const productRoutes = express.Router()

productRoutes.get("/:userId", getUserProduct)
productRoutes.post("/add", upload.single("image"), addProduct);
productRoutes.post("/edit", upload.single("image"), editProduct);


export default productRoutes