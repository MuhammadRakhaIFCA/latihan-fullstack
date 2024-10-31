import express from "express"
import { } from "../controller/chatController.js"
import { addChat } from "../controller/chatController.js"
import { deleteChat } from "../controller/chatController.js"
import { getChat } from "../controller/chatController.js"
import upload from "../middleware/upload.js"




const chatRoutes = express.Router()

chatRoutes.post("/add", upload.single("image"), addChat)
chatRoutes.delete("/delete", deleteChat)
chatRoutes.get("/get", getChat)



export default chatRoutes