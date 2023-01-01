import {NextFunction, Request, Response} from "express";
import {HttpError} from "../utils/httpError";

const errorMiddleware = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
    if (!error) return next();
    res.status(error.status || 500).json(error);
}

export default errorMiddleware;