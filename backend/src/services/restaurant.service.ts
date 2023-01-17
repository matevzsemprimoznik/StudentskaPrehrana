import Restaurant from "../models/restaurant.model";
import {objectToDotNotation} from "../utils/toDotNotation";
import {getCurrentDate} from "../utils/date";
import {HttpError} from "../utils/httpError";
import * as fs from "fs";
import path from "path";

const getAll = async () => {
    return Restaurant.find();
}
const getById = async (id: string) => {
    return Restaurant.findById(id, {'openingHours._id': 0});
}

const updateById = async (id: string, update: Object) => {
    const converted = objectToDotNotation(update);
    return Restaurant.updateOne({_id: id}, {$set: converted});
}

const saveComment = async (userId: string, restaurantId: string, commentText: string) => {
    const comment = {
        userId: userId,
        comment: commentText,
        date: getCurrentDate()
    }
    return Restaurant.updateOne({ _id: restaurantId }, { $push: { comments: comment } })
}

const saveRating = async (userId: string, restaurantId: string, ratingNumber: string) => {
    const rating = {
        userId: userId,
        rating: ratingNumber,
    }
    return Restaurant.updateOne({ _id: restaurantId }, { $push: { ratings: rating } })
}

const saveDishRating = async (userId: string, restaurantId: string, dishName: string, ratingNumber: string) => {
    const rating = {
        userId: userId,
        rating: ratingNumber,
    }

    return Restaurant.updateOne({ _id: restaurantId, 'menu.name': dishName }, { $push: { 'menu.$.ratings': rating } });
}

const saveDishComment = async (userId: string, restaurantId: string, dishName: string, commentText: string) => {
        const comment = {
            userId: userId,
            comment: commentText,
            date: getCurrentDate()
        }

        return Restaurant.updateOne({ _id: restaurantId, 'menu.name': dishName }, { $push: { 'menu.$.comments': comment } });
}

const postDishImg = async (id: string, dishName: string, imgName: string) => {
    const restaurant = await Restaurant.findById(id);
    console.log(restaurant)
    if(!restaurant)
        throw new HttpError(400,"No restaurant found with that id.")
    if(!restaurant.menu || restaurant.menu.length === 0)
        throw new HttpError(400,"No menu found for that restaurant.")

    const dish = restaurant.menu.find(dish => dish.name === dishName)
    if(!dish)
        throw new HttpError(400,"No dish found with that name.")

    const images = dish.images || [];
    images.push(imgName);
    await Restaurant.updateOne({_id: restaurant._id, "menu.name": dishName}, {$set: {"menu.$.images": images}})
}

const saveDishImg = async (img: string) => {
    const imgName = Date.now()+'.png'
    const savePath = path.join(__dirname, '../../../images/dishes/' + imgName)
    const base64Data = img.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    fs.writeFileSync(savePath, base64Data,  {encoding: 'base64'});

    return imgName;
}

export default {
    getAll,
    getById,
    updateById,
    saveComment,
    saveRating,
    saveDishRating,
    saveDishComment,
    postDishImg,
    saveDishImg
}