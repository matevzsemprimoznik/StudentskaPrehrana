import {IUser} from "./src/models/user.model";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            DATABASE_URI: string;
        }
    }
    namespace Express {
        export interface Request {
            user: IUser
        }
    }
}