import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users";
import projectsRoutes from "./routes/projects";
import pullRequestsRoutes from "./routes/pullRequests";
import issuesRoutes from './routes/issues'
import bodyParser from 'body-parser'

require('dotenv').config();

const app = express();

const PORT: string | number = process.env.PORT || 4000;



app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(projectsRoutes);
app.use(pullRequestsRoutes);
app.use(issuesRoutes)

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
