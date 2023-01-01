import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {connectToDatabase} from "./src/db/connect";

dotenv.config();
connectToDatabase()


const app: Express = express();
const port = process.env.PORT;

app.get('/test', (req: Request, res: Response) => {
    return res.send('Success');
});



app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

