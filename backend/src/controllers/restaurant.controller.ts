import {NextFunction, Request, Response} from "express";
import restaurantService from "../services/restaurant.service";
import {ErrorHandler} from "../utils/errorHandler";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurants = await restaurantService.getAll();
        res.json(restaurants);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurant = await restaurantService.getById(req.params.id);
        return res.json(restaurant);
    } catch (err) {
        console.log(err)
        return next(new ErrorHandler(err));
    }
}

export default {
    getAll,
    getById
}