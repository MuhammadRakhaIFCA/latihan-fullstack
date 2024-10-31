import { pool } from "../db.js"

class chatModel {
    constructor(parameters) {

    }

    async addChat({ senderId, receiverId, text, image }) {
        try {
            const result = await pool.query(`INSERT INTO chats (sender_id, receiver_id, text, image)
                VALUES ($1, $2, $3, $4) RETURNING *`, [senderId, receiverId, text || "", image || ""])
            return result.rows[0]
        } catch (error) {
            console.log(error)
        }
    }

    async deleteChat({ chatId }) {
        try {
            await pool.query(`DELETE FROM chats WHERE id = $1`, [chatId])
        } catch (error) {
            console.log(error)
        }
    }

    async getChat(senderId, receiverId) {
        try {
            const result = await pool.query(`
                SELECT 
                    c.id AS chat_id,
                    c.text AS content,
                    c.image,
                    c.created_at,
                    sender.id AS sender_id,
                    sender.username AS sender_username,
                    sender.profile_picture AS sender_profile_picture,
                    receiver.id AS receiver_id,
                    receiver.username AS receiver_username,
                    receiver.profile_picture AS receiver_profile_picture
                FROM chats AS c
                JOIN users AS sender ON sender.id = c.sender_id
                JOIN users AS receiver ON receiver.id = c.receiver_id
                WHERE 
                    (c.sender_id = $1 AND c.receiver_id = $2)
                    OR (c.sender_id = $2 AND c.receiver_id = $1)
                ORDER BY c.created_at ASC;
            `, [senderId, receiverId]);

            return result.rows;
        } catch (error) {
            console.error(error); // Log the error for debugging
            return { error: { message: "No chat yet" } };
        }
    }

}

export default chatModel