import UserModel from "../model/userModel.js";
import jwt from "jsonwebtoken";

const users = new UserModel

export const register = async (req, res) => {
    const { email, username, password } = req.body

    try {
        const data = await users.register({ email, username, password })
        if (data.error) {
            res.status(500).json(data.error)
        }
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body

    try {
        const data = await users.login({ username, password })
        if (data.error) {
            res.status(404).send(data.error)
        }
        const token = jwt.sign({ id: data.id }, "secret key")
        // const { password, ...others } = data
        res.cookie("accessToken", token, {
            httpOnly: true
        }).status(202).json(data)
    } catch (error) {
        console.log(error)
    }
}

export const getUserById = async (req, res) => {
    const userId = req.params.userId

    try {
        const data = await users.getUserById(userId)
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

export const getFollowedUsers = async (req, res) => {
    const { userId } = req.body

    try {
        const data = await users.getFollowedUsers({ userId })
        res.status(202).json(data)
    } catch (error) {

    }
}
export const getUnfollowedUsers = async (req, res) => {
    const { userId } = req.body

    try {
        const data = await users.getUnfollowedUsers({ userId })
        res.status(202).json(data)
    } catch (error) {

    }
}

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).send("log out successful")
}