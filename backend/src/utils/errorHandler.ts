import {HttpError} from "./httpError";

export class ErrorHandler {
    public status: number;
    public message: string;
    public name?: string;

    constructor(error: unknown, name?: string) {
        this.status = (error as HttpError).status ?? 500;
        this.message = (error as HttpError).message;
        if (name) this.name = name;
    }
}