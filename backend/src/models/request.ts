import {Request} from "express";
import {IncomingHttpHeaders} from "http";
import {IUser} from "./user.model";

export interface CustomRequest extends Request {
    headers: IncomingHttpHeaders & { user: IUser }
}