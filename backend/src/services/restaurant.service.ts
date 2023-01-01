import Restaurant from "../models/restaurant.model";

const getAll = async () => {
    return Restaurant.find();
}
const getById = async (id: string) => {
    return Restaurant.findById(id);
}

export default {
    getAll,
    getById
}