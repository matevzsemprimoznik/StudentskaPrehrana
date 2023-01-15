import {Schema} from "mongoose";

export interface IMenuItem {
    name: string;
    comments?: [],
    ratings?: []
}

const MenuItemSchema = new Schema<IMenuItem>({
    name: {type: String, required: true},
    comments: [],
    ratings: [],
})

export default MenuItemSchema