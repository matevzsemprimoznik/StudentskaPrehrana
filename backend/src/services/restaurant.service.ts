import Restaurant from "../models/restaurant.model";
import {objectToDotNotation} from "../utils/toDotNotation";

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

export default {
    getAll,
    getById,
    updateById
}