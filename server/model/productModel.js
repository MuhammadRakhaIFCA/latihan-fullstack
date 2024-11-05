import { pool } from "../db.js"

class ProductModel {
    constructor(parameters) {

    }

    async getUserProduct(userId) {
        try {
            const result = await pool.query(`
                SELECT * FROM products
                WHERE owner_id = $1
                `, [userId])
            return result.rows
        } catch (error) {

        }
    }
    async getProductDetail(productId) {
        try {
            const result = await pool.query(`
                SELECT 
                users.id as userId,
                users.username,
                users.profile_picture,
                products.id as productId,
                products.name,
                products.description,
                products.stock,
                products.price,
                products.product_image
                FROM products
                JOIN users ON products.owner_id = users.id
                WHERE products.id = $1
                `, [productId])
            return result.rows[0]
        } catch (error) {
            console.log(error)
        }
    }
    async addProduct({ userId, name, description, price, stock, product_image }) {
        try {
            const result = await pool.query(`
                INSERT INTO products (owner_id, name, description, price, stock, product_image) 
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
                `, [userId, name, description, price, stock, product_image || ""])
            return result.rows[0]
        } catch (error) {
            console.log(error)
        }
    }
    async editProduct({ name, description, price, stock, product_image, id, userId }) {
        try {
            const prevImage = await pool.query(`
                SELECT product_image FROM products WHERE id = $1   
                `, [id])
            const result = await pool.query(`
                UPDATE products 
                SET 
                name = $1, 
                description = $2,
                price = $3,
                stock = $4,
                product_image = $5
                WHERE id = $6 AND owner_id = $7
                RETURNING *
                `, [name, description, price, stock, product_image || prevImage.rows[0].product_image || "", id, userId])
            return result.rows[0]
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProductModel