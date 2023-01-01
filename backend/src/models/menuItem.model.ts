import {Schema} from "mongoose";

export interface IMenuItem {
    name: string;
}

const MenuItemSchema = new Schema<IMenuItem>({
    name: {type: String, required: true},
})

export default MenuItemSchema