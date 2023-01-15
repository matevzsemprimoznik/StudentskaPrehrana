import Restaurant from "../models/restaurant.model";
import {objectToDotNotation} from "../utils/toDotNotation";
import {getCurrentDate} from "../utils/date";

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

export default {
    getAll,
    getById,
    updateById,
    saveComment,
    saveRating,
    saveDishRating,
    saveDishComment
}