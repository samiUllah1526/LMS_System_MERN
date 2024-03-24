import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFoundError404 } from "./utils/errors";
import { errorMiddleWare } from "./middleWares";

export const app = express();

//body parse
app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);


app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ success: true, message: "Server is running" });
  });

app.all('/', function(req, res) {
    console.log("All catch route")
    const err = notFoundError404(`Route ${req.originalUrl} not found`)
    res.status(err.statusCode).json(err);
});

app.use(errorMiddleWare)
