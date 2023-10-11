"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.updateUser = exports.addUser = exports.getUsers = void 0;
const users_1 = __importDefault(require("../../models/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const secretKey = 'your-secret-key';
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_1.default.find();
        res.status(200).json({ users });
    }
    catch (error) {
        throw error;
    }
});
exports.getUsers = getUsers;
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10; // You can adjust the number of salt rounds for security
        try {
            const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
            return hashedPassword;
        }
        catch (error) {
            throw error;
        }
    });
}
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = new users_1.default({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            role: body.role,
            password: yield hashPassword(body.password),
        });
        const newUser = yield user.save();
        const accessToken = jsonwebtoken_1.default.sign({ email: user.email, id: user.id }, secretKey);
        res.json({ accessToken, user: newUser });
        res
            .status(201)
            .json({ message: "User added", user: newUser });
    }
    catch (error) {
        res
            .status(500)
            .json({ error, message: 'An error occurred while signing up a user' });
    }
});
exports.addUser = addUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield users_1.default.findOne({ email: email });
        if (!user) {
            res.sendStatus(401);
        }
        else {
            bcrypt_1.default.compare(password, user.password, (err, result) => {
                if (err || !result) {
                    return res.sendStatus(401);
                }
                else {
                    const accessToken = jsonwebtoken_1.default.sign({ email: user.email, id: user.id }, secretKey);
                    res.json({ accessToken, user });
                }
            });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ error, message: 'An error occurred while signing up a user' });
    }
});
exports.loginUser = loginUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateUser = yield users_1.default.findByIdAndUpdate({ _id: id }, body);
        const allUsers = yield users_1.default.find();
        res.status(200).json({
            message: "User updated",
            user: updateUser,
            users: allUsers,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield users_1.default.findByIdAndRemove(req.params.id);
        const allUsers = yield users_1.default.find();
        res.status(200).json({
            message: "User deleted",
            user: deletedUser,
            users: allUsers,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteUser = deleteUser;
