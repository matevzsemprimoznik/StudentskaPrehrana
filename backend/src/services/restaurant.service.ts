import Restaurant from "../models/restaurant.model";
import {objectToDotNotation} from "../utils/toDotNotation";
import {getCurrentDate} from "../utils/date";
import {HttpError} from "../utils/httpError";

const getAll = async () => {
    return Restaurant.find();
}
const getById = async (id: string) => {
    return Restaurant.findById(id);
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

export default {
    getAll,
    getById,
    updateById,
    saveComment,
    saveRating
}