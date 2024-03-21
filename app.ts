import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

//body parse
app.use(express.json({ limit:  "50mb" }))

app.use(cookieParser())

app.use(cors({
    origin: process.env.ORIGIN,
}))