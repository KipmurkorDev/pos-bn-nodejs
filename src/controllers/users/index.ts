import { Response, Request } from "express"
import { IUser } from "./../../types/users"
import User from "../../models/users"

const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await User.find()
        res.status(200).json({ users })
    } catch (error) {
        throw error
    }
}

const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IUser, "firstName" | "lastName" | "email" | "role">


        const user: IUser = new User({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            role: body.role
        })


        const newUser: IUser = await user.save()
        const allUsers: IUser[] = await User.find()

        res
            .status(201)
            .json({ message: "User added", user: newUser, users: allUsers })
    } catch (error) {
        throw error
    }
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updateUser: IUser | null = await User.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allUsers: IUser[] = await User.find()
        res.status(200).json({
            message: "User updated",
            user: updateUser,
            users: allUsers,
        })
    } catch (error) {
        throw error
    }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedUser: IUser | null = await User.findByIdAndRemove(
            req.params.id
        )
        const allUsers: IUser[] = await User.find()
        res.status(200).json({
            message: "User deleted",
            user: deletedUser,
            users: allUsers,
        })
    } catch (error) {
        throw error
    }
}

export { getUsers, addUser, updateUser, deleteUser }


