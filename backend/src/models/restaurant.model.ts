import {model, Schema} from "mongoose";
import OpeningHoursSchema, {IOpeningHours} from "./openingHours.model";
import MenuItem, {IMenuItem} from "../models/menuItem.model";

export interface IRestaurant {
    title: string;
    address: string;
    phone: string;
    extras: string[];
    price: string;
    surcharge: string;
    openingHours: IOpeningHours;
    menu: IMenuItem[];
    image: string;
}

const RestaurantSchema = new Schema<IRestaurant>({
    title: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    extras: {type: [String], required: true},
    price: {type: String, required: true},
    surcharge: {type: String, required: true},
    openingHours: OpeningHoursSchema,
    menu: [MenuItem.schema],
    image: {type: String, required: true},
})

export default model<IRestaurant>('Restaurant', RestaurantSchema, 'restaurants')