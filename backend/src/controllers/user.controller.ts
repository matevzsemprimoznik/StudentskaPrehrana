import {NextFunction, Request, Response} from "express";
import {ErrorHandler} from "../utils/errorHandler";
import userService from "../services/user.service";
import {ISavedDishes} from "../models/savedDishes.model";

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

export const getByUid = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getByUid(req.params.uid);
        return res.json(user);
    } catch (err) {
        console.log(err)
        return next(new ErrorHandler(err));
    }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getById(req.params.id);
        return res.json(user);
    } catch (err) {
        console.log(err)
        return next(new ErrorHandler(err));
    }
}

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userService.updateById(req.params.id, req.body);
        const updatedUser = await userService.getById(req.params.id);
        return res.json(updatedUser);
    } catch (err) {
        console.log(err)
        return next(new ErrorHandler(err));
    }
}

export const saveDish = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dish: ISavedDishes = {
            name: req.body.name,
            restaurant: req.body.restaurant,
            image: req.body.image
        }
        const savedDish = await userService.saveDish(req.user._id, dish);
        return res.status(200).send(savedDish);
    } catch (err) {
        console.log(err);
        next(new ErrorHandler(err));
    }
}

export const getSavedDishes = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user._id)
    try {
        const savedDishes = await userService.getSavedDishes(req.user._id);
        console.log(savedDishes)
        return res.json(savedDishes);
    } catch (err) {
        console.log(err)
        return next(new ErrorHandler(err));
    }
}

export const removeSavedDish = async (req: Request, res: Response, next: NextFunction) => {
    console.log("alo");
    console.log(req.params.dishName);
    const { dishName } = req.params
    const decodedDishName = decodeURIComponent(dishName)
    try {
        const deletedDish = await userService.removeSavedDish(req.user._id, decodedDishName)
        return res.json(deletedDish);
    } catch (err) {
        console.log(err)
        return next(new ErrorHandler(err));
    }
}

export default {
    addUser,
    getByUid,
    getById,
    updateById,
    saveDish,
    getSavedDishes,
    removeSavedDish
}