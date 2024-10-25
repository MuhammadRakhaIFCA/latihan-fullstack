import commentModel from "../model/commentModel.js"


const comments = new commentModel()

export const addComment = async (req, res) => {
    const { userId, postId, content } = req.body

    try {
        const data = await comments.addComment({ userId, postId, content })
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}

export const deleteComment = async (req, res) => {
    const { commentId } = req.body

    try {
        const data = await comments.deleteComment({ commentId })
    } catch (error) {
        console.log(error)
    }
}

export const getComment = async (req, res) => {
    const { postId } = req.body

    try {
        const data = await comments.getComment({ postId })
        res.status(202).json(data)
    } catch (error) {
        console.log(error)
    }
}