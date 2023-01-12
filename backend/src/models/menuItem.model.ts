import {model, Schema} from "mongoose";

export interface IMenuItem {
    name: string;
    description: string;
    course: string[];
    images: string[];
}

const MenuItemSchema = new Schema<IMenuItem>({
    name: {type: String, required: true},
    description: {type: String},
    course: {type: [String], required: true},
    images: {type: [String], required: true},

})

export default model<IMenuItem>('MenuItem', MenuItemSchema, 'menuItems')