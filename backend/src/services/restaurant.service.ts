import Restaurant from "../models/restaurant.model";
import MenuItem from "../models/menuItem.model";
import fs from "fs";
import {HttpError} from "../utils/httpError";

const getAll = async () => {
    return Restaurant.find();
}
const getById = async (id: string) => {
    return Restaurant.findById(id);
}

const postDishImg = async (id: string, dishName: string, imgName: string) => {
    const restaurant = await Restaurant.findById(id);
    if(restaurant){
        const menuItem = await MenuItem.findOne({ name: dishName, restaurant: restaurant._id });
        if(menuItem) {
            menuItem.images.push(imgName);
            await menuItem.save();
        } else {
            throw new HttpError(402, "No dish found with that name.")
        }
    } else {
        throw new HttpError(402,"No restaurant found with that id.")
    }
}

const saveDishImg = async (img: string) => {
        const imgName = Date.now()+'.png'
        const path = '../../images/dishes/' + imgName
        const base64Data = img.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        fs.writeFileSync(path, base64Data,  {encoding: 'base64'});

        return imgName;
}

export default {
    getAll,
    getById,
    postDishImg,
    saveDishImg
}