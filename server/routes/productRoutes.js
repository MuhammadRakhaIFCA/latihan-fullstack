import express from "express"
import upload from "../middleware/upload.js"
import { addProduct, editProduct, getProductDetail, getUserProduct } from "../controller/productController.js";


const productRoutes = express.Router()

productRoutes.get("/get/:userId", getUserProduct)
productRoutes.get("/get/detail/:productId", getProductDetail)
productRoutes.post("/add", upload.single("image"), addProduct);
productRoutes.post("/edit/:productId", upload.single("image"), editProduct);


export default productRoutes