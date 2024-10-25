import express from "express"
import { addComment, deleteComment, getComment } from "../controller/commentController.js"




const commentRoutes = express.Router()

commentRoutes.post("/add", addComment)
commentRoutes.delete("/delete", deleteComment)
commentRoutes.get("/get", getComment)



export default commentRoutes