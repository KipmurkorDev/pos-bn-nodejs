import { Response, Request } from "express"
import { IUser } from "./../../types/users"
import User from "../../models/users"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const secretKey = 'your-secret-key';

const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await User.find()
        res.status(200).json({ users })
    } catch (error) {
        throw error
    }
}

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // You can adjust the number of salt rounds for security

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IUser, "firstName" | "lastName" | "email" | "role" | "password">


        const user: IUser = new User({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            role: body.role,
            password: await hashPassword(body.password),
        })


        const newUser: IUser = await user.save()

        const accessToken = jwt.sign({ email: user.email, id: user.id }, secretKey);

        res.status(201).json({ message: "User added", accessToken, user: newUser });

    } catch (error) {
        res
            .status(500)
            .json({ error, message: 'An error occurred while signing up a user' })
    }
}

const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body as Pick<IUser, "email" | "password">


        const user: IUser | null = await User.findOne({ email: email })
        if (!user) { res.sendStatus(401); }
        else {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err || !result) { return res.sendStatus(401); }
                else {
                    const accessToken = jwt.sign({ email: user.email, id: user.id }, secretKey);
                    res.json({ accessToken, user });
                }
            });

        }

    } catch (error) {
        res
            .status(500)
            .json({ error, message: 'An error occurred while signing up a user' })
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

export { getUsers, addUser, updateUser, deleteUser, loginUser }



