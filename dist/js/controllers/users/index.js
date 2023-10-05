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
exports.deleteUser = exports.updateUser = exports.addUser = exports.getUsers = void 0;
const users_1 = __importDefault(require("../../models/users"));
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
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = new users_1.default({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            role: body.role,
            password: body.password,
        });
        const newUser = yield user.save();
        const allUsers = yield users_1.default.find();
        res
            .status(201)
            .json({ message: "User added", user: newUser, users: allUsers });
    }
    catch (error) {
        throw error;
    }
});
exports.addUser = addUser;
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
