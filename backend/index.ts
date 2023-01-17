import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import path from 'path';
import {connectToDatabase} from "./src/db/connect";
import restaurantRoute from "./src/routes/restaurant.route";
import errorMiddleware from "./src/middlewares/error.middleware";
import userRoute from "./src/routes/user.route";
import bodyParser from "body-parser";
import cors from 'cors';
import authMiddleware from "./src/middlewares/auth.middleware";

dotenv.config();
connectToDatabase()

const app: Express = express();
const port = process.env.PORT;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '5mb'}));

app.get('/test', authMiddleware, (req: Request, res: Response) => {
    console.log(req.headers)
    res.send('Hello World!');
});

app.use('/images', express.static(path.join(__dirname.substring(0, __dirname.lastIndexOf('\\')), 'images')));
app.use('/restaurant', restaurantRoute)
app.use('/user', userRoute)
app.use(errorMiddleware)

app.get('/test', (req: Request, res: Response) => {
    return res.send('Success');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

