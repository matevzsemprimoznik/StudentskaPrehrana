import {NextFunction, Request, Response} from "express";
import userService from "../services/user.service";
import admin from "../utils/admin";


const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization)
        return res.status(401).json({ error: 'Wrong credentials' });

    try {
        const decoded = await admin.auth().verifyIdToken(req.headers.authorization.split(' ')[1]);

        const user = await userService.getByUid(decoded.uid)

        if(!user)
            return res.status(401).json({ error: 'Wrong credentials' });

        req.user = user;
        next();
    }
    catch (e){
        console.log(e)
        return res.status(401).json({ error: 'Wrong credentials' });
    }
}

export default authMiddleware;