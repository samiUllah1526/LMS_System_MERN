import express, { NextFunction, Request, Response } from "express";
import { badRequestError, unauthorizedError } from "../utils/errors";

type f = (req: Request, res: Response,  next: NextFunction) => void;
export const catchAsyncErrors = (func: f) => (req: Request, res: Response,  next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch(next)
}

export const errorMiddleWare = (err: any, req: Request, res: Response,  next: NextFunction) => {
    err.statusCode = err.statusCode ?? 500
    err.message = err.message ?? "Internal Server Error"

    if(err.name === "CastError") {
        const description = `Resource not found ${err.path}`
        err = badRequestError(description)
        res.status(err.statusCode).json(err);
    }

    //duplicate key error
    if(err.code === 11000) {
        const description = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = badRequestError(description)
        res.status(err.statusCode).json(err);
    }

    if(err.name === "JsonWebTokenError") {
        const description = `Invalid access token`
        err = unauthorizedError(description)
        res.status(err.statusCode).json(err);
    }

    if(err.name === "TokenExpiredError") {
        const description = `Expired access token`
        err = unauthorizedError(description)
        res.status(err.statusCode).json(err);
    }

    res.status(err.statusCode).json(err);
}
