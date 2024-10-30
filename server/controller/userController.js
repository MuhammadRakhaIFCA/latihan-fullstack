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
    const userId = req.params.userId

    try {
        const data = await users.getFollowedUsers(userId)
        res.status(202).json(data)
    } catch (error) {

    }
}
export const getUnfollowedUsers = async (req, res) => {
    const { userId } = req.params.userId

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

export const editUser = async (req, res) => {
    const { userId, username, location, website } = req.body;
    const profile_picture = req.file ? req.file.filename : null;

    try {
        const data = await users.editUser({ username, profile_picture, location, website, userId })
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating profile" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const data = await users.getAllUsers()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

export const searchUsers = async (req, res) => {
    const { query } = req.query;

    try {
        const result = await users.searchUsers(query);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error searching users" });
    }
};

