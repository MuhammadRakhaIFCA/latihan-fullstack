import chatModel from "../model/chatModel.js"


const chats = new chatModel()

export const addChat = async (req, res) => {
    const { senderId, receiverId, text } = req.body
    const image = req.file ? req.file.filename : null

    try {
        const data = await chats.addChat({ senderId, receiverId, text, image })
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}

export const deleteChat = async (req, res) => {
    const { chatId } = req.body

    try {
        const data = await chats.deleteChat({ chatId })
    } catch (error) {
        console.log(error)
    }
}

export const getChat = async (req, res) => {
    const senderId = req.query.senderId
    const receiverId = req.query.receiverId

    try {
        const data = await chats.getChat(senderId, receiverId)
        res.status(202).json(data)
    } catch (error) {
        console.log(error)
    }
}