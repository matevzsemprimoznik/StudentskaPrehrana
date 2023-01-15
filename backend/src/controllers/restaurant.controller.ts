import {NextFunction, Request, Response} from "express";
import restaurantService from "../services/restaurant.service";
import {ErrorHandler} from "../utils/errorHandler";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurants = await restaurantService.getAll();
        res.json(restaurants);
    } catch (err) {
        console.log(err);
        next(new ErrorHandler(err));
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

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurant = await restaurantService.updateById(req.params.id, req.body);
        return res.json(restaurant);
    } catch (err) {
        console.log(err)
        return next(new ErrorHandler(err));
    }
}

export const saveComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const { userId, restaurantId, comment } = req.body
        const savedComment = await restaurantService.saveComment(userId, restaurantId, comment);
        return res.status(200).send(savedComment);
    } catch (err) {
        console.log(err);
        next(new ErrorHandler(err));
    }
}

export const saveRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const { userId, restaurantId, rating } = req.body
        const savedRating = await restaurantService.saveRating(userId, restaurantId, rating);
        return res.status(200).send(savedRating);
    } catch (err) {
        console.log(err);
        next(new ErrorHandler(err));
    }
}

export const saveDishRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const { userId, restaurantId, dishName, rating } = req.body
        const savedRating = await restaurantService.saveDishRating(userId, restaurantId, dishName, rating);
        return res.status(200).send(savedRating);
    } catch (err) {
        console.log(err);
        next(new ErrorHandler(err));
    }
}

export const saveDishComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const { userId, restaurantId, dishName, comment } = req.body
        const savedComment = await restaurantService.saveDishComment(userId, restaurantId, dishName, comment);
        return res.status(200).send(savedComment);
    } catch (err) {
        console.log(err);
        next(new ErrorHandler(err));
    }
}
export default {
    getAll,
    getById,
    updateById,
    saveComment,
    saveRating,
    saveDishRating,
    saveDishComment,
}