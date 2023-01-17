import {Schema} from "mongoose";

export interface IMenuItem {
    name: string;
    comments?: [],
    ratings?: []
    images: string[];
}

const MenuItemSchema = new Schema<IMenuItem>({
    name: {type: String, required: true},
    comments: [],
    ratings: [],
    images: [{type: String}]
})

export default MenuItemSchema