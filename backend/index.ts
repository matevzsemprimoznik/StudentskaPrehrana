import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import path from 'path';
import {connectToDatabase} from "./src/db/connect";
import restaurantRoute from "./src/routes/restaurant.route";
import errorMiddleware from "./src/middlewares/error.middleware";

dotenv.config();
connectToDatabase()

const app: Express = express();
const port = process.env.PORT;

app.use('/images', express.static(path.join(__dirname.substring(0, __dirname.lastIndexOf('\\')), 'images')));
app.use('/restaurant', restaurantRoute)
app.use(errorMiddleware)

app.get('/test', (req: Request, res: Response) => {
    return res.send('Success');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

