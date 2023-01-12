import {NextFunction, Request, Response} from "express";
import {ErrorHandler} from "../utils/errorHandler";
import userService from "../services/user.service";

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const user = await userService.addUser(req.body);
        return res.status(200).send({ created: user });
    } catch (err) {
        console.log(err);
        next(new ErrorHandler(err));
    }
}

export const getByUid = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getByUid(req.params.uid);
        return res.json(user);
    } catch (err) {
        console.log(err)
        return next(new ErrorHandler(err));
    }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getById(req.params.id);
        return res.json(user);
    } catch (err) {
        console.log(err)
        return next(new ErrorHandler(err));
    }
}

export default {
    addUser,
    getByUid,
    getById
}