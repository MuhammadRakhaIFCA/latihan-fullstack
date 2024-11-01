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
                    c.read,
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

            await pool.query(`UPDATE chats SET read = true WHERE receiver_id = $1 AND sender_id = $2`,
                [senderId, receiverId])
            return result.rows;
        } catch (error) {
            console.error(error); // Log the error for debugging
            return { error: { message: "No chat yet" } };
        }
    }

    async getChatBox(userId) {
        try {

            const result = await pool.query(`
                SELECT DISTINCT ON (u.id)
                u.id,
                u.username,
                u.profile_picture,
                c.id AS last_chat_id,
                c.text AS content,
                c.created_at AS created_at,
                c.receiver_id AS receiver_id,
                COALESCE(unread_count.unread_messages, 0) AS unread_message_count
            FROM users AS u
            JOIN chats AS c
                ON (u.id = c.sender_id AND c.receiver_id = $1)
                OR (u.id = c.receiver_id AND c.sender_id = $1)
            LEFT JOIN (
                SELECT 
                    sender_id,
                    receiver_id,
                    COUNT(*) AS unread_messages
                FROM chats
                WHERE read = false AND receiver_id = $1
                GROUP BY sender_id, receiver_id
            ) AS unread_count
                ON ((u.id = unread_count.sender_id AND unread_count.receiver_id = $1)
                    OR (u.id = unread_count.receiver_id AND unread_count.sender_id = $1))
            WHERE u.id != $1
            ORDER BY u.id, c.created_at DESC;
`, [userId])
            return result.rows
        } catch (error) {
            console.error(error)
        }
    }

}

export default chatModel