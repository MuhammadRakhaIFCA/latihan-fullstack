import express from "express"
import { addPost, getPost } from "../controller/postController.js"

const postRoutes = express.Router()

postRoutes.get("/", getPost)
postRoutes.post("/add", addPost)

export default postRoutes