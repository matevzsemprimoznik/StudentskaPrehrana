import Restaurant from "../models/restaurant.model";
import MenuItem from "../models/menuItem.model";
import fs from "fs";
import {HttpError} from "../utils/httpError";
import path from "path";

const getAll = async () => {
    return Restaurant.find();
}
const getById = async (id: string) => {
    return Restaurant.findById(id);
}

const postDishImg = async (id: string, dishName: string, imgName: string) => {
    const restaurant = await Restaurant.findById(id);
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
    postDishImg,
    saveDishImg
}