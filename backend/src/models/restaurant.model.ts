import {model, Schema} from "mongoose";
import OpeningHoursSchema, {IOpeningHours} from "./openingHours.model";
import MenuItemSchema, {IMenuItem} from "./menuItem.model";

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
    comments?: [];
    ratings?: [];
}

const RestaurantSchema = new Schema<IRestaurant>({
    title: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    extras: {type: [String], required: true},
    price: {type: String, required: true},
    surcharge: {type: String, required: true},
    openingHours: OpeningHoursSchema,
    menu: [MenuItemSchema],
    image: {type: String, required: true},
    comments: [],
    ratings: []
})

export default model<IRestaurant>('Restaurant', RestaurantSchema, 'restaurants')