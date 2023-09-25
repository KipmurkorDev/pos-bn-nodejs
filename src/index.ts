import express, { Express } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import todoRoutes from "./routes/users";
import bodyParser from 'body-parser'

require('dotenv').config();

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(todoRoutes);

const uri: string = `mongodb+srv://carenkurgat765:${process.env.MONGO_PASSWORD}@pos0.lcyyjkc.mongodb.net/`;


console.log({ uri })
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
