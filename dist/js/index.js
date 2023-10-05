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
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const passport_local_1 = __importDefault(require("passport-local"));
require('dotenv').config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const authUser = (user, password, done) => {
    let authenticated_user = { id: 123, name: "Kyle" };
    return done(null, authenticated_user);
};
app.use((0, cors_1.default)());
app.use((0, express_session_1.default)({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(users_1.default);
app.use(projects_1.default);
passport_1.default.use(new passport_local_1.default.Strategy(authUser));
passport_1.default.serializeUser((userObj, done) => { done(null, userObj); });
passport_1.default.deserializeUser((userObj, done) => { return done(null, userObj); });
let count = 1;
const printData = (req, res, next) => {
    console.log("\n==============================");
    console.log(`------------>  ${count++}`);
    console.log(`req.body.username -------> ${req.body.username}`);
    console.log(`req.body.password -------> ${req.body.password}`);
    console.log(`\n req.session.passport -------> `);
    console.log(req.session.passport);
    console.log(`\n req.user -------> `);
    console.log(req.user);
    console.log("\n Session and Cookie");
    console.log(`req.session.id -------> ${req.session.id}`);
    console.log(`req.session.cookie -------> `);
    console.log(req.session.cookie);
    next();
};
app.use(printData);
app.get("/login", (req, res) => {
    res.status(400).json({});
});
app.post("/login", passport_1.default.authenticate('local', {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
}));
app.get("/dashboard", (req, res) => {
    res.status(200).json({});
});
const uri = `mongodb+srv://carenkurgat765:${process.env.MONGO_PASSWORD}@pos0.lcyyjkc.mongodb.net/`;
const options = {};
mongoose_1.default
    .connect(uri, options)
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((error) => {
    throw error;
});
