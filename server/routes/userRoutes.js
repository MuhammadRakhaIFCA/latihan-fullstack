import express from "express"
import { getFollowedUsers, getUnfollowedUsers, getUserById, login, logout, register } from "../controller/userController.js"


const userRoutes = express.Router()

userRoutes.post("/register", register)
userRoutes.post("/login", login)
userRoutes.post("/logout", logout)
userRoutes.get("/get/:userId", getUserById)
userRoutes.get("/followed", getFollowedUsers)
userRoutes.get("/unfollowed", getUnfollowedUsers)

export default userRoutes