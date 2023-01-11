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

export default {
    addUser
}