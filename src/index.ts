import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users";
import projectsRoutes from "./routes/projects";
import bodyParser from 'body-parser'
import passport from 'passport'
import session from 'express-session'
import LocalStrategy from 'passport-local'

require('dotenv').config();

const app = express();

const PORT: string | number = process.env.PORT || 4000;

const authUser = (user: any, password: any, done: any) => {
    let authenticated_user = { id: 123, name: "Kyle" }
    return done(null, authenticated_user)
}

app.use(cors());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(projectsRoutes);

passport.use(new LocalStrategy.Strategy(authUser))

passport.serializeUser((userObj, done) => { done(null, userObj) })

passport.deserializeUser((userObj: any, done) => { return done(null, userObj); })

let count = 1

const printData = (req: any, res: any, next: any) => {
    console.log("\n==============================")
    console.log(`------------>  ${count++}`)

    console.log(`req.body.username -------> ${req.body.username}`)
    console.log(`req.body.password -------> ${req.body.password}`)
    console.log(`\n req.session.passport -------> `)
    console.log(req.session.passport)
    console.log(`\n req.user -------> `)
    console.log(req.user)
    console.log("\n Session and Cookie")
    console.log(`req.session.id -------> ${req.session.id}`)
    console.log(`req.session.cookie -------> `)
    console.log(req.session.cookie)
    next()
}

app.use(printData)

app.get("/login", (req: any, res: any) => {
    res.status(400).json({})
})

app.post("/login", passport.authenticate('local', {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
}))

app.get("/dashboard", (req: any, res: any) => {
    res.status(200).json({})
})

const uri: string = `mongodb+srv://carenkurgat765:${process.env.MONGO_PASSWORD}@pos0.lcyyjkc.mongodb.net/`;

const options: ConnectOptions = {};

mongoose
    .connect(uri, options)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch((error) => {
        throw error;
    });
