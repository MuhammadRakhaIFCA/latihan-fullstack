import ProductModel from "../model/productModel.js";

const products = new ProductModel()

export const getUserProduct = async (req, res) => {
    const userId = req.params.userId
    try {
        const data = await products.getUserProduct(userId)
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

export const getProductDetail = async (req, res) => {
    const productId = req.params.productId
    try {
        const data = await products.getProductDetail(productId)
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

export const addProduct = async (req, res) => {
    const { userId, name, description, price, stock } = req.body
    const product_image = req.file ? req.file.filename : null
    try {
        const data = await products.addProduct({ userId, name, description, price, stock, product_image })
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}
export const editProduct = async (req, res) => {
    const { name, description, price, stock, id } = req.body
    const product_image = req.file ? req.file.filename : null
    try {
        const data = await products.editProduct({ userId, name, description, price, stock, product_image, id })
        res.status().json(data)
    } catch (error) {

    }
}