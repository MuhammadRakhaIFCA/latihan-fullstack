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
    async editProduct({ name, description, price, stock, product_image, id }) {
        try {
            const result = await pool.query(`
                UPDATE products 
                SET 
                name = $1, 
                description = $2,
                price = $3,
                stock = $4,
                product_image = $5,
                WHERE id = $6
                RETURNING *
                `, [name, description, price, stock, product_image, id])
            return result.rows[0]
        } catch (error) {

        }
    }
}

export default ProductModel