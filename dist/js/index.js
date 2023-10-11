"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
const projects_1 = __importDefault(require("./routes/projects"));
const body_parser_1 = __importDefault(require("body-parser"));
require('dotenv').config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(users_1.default);
app.use(projects_1.default);
const uri = `mongodb+srv://carenkurgat765:${process.env.MONGO_PASSWORD}@pos0.lcyyjkc.mongodb.net/`;
const options = {};
mongoose_1.default
    .connect(uri, options)
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((error) => {
    throw error;
});
