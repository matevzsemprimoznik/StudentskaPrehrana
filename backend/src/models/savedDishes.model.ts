import {Schema} from "mongoose";

export interface ISavedDishes {
    name: string;
    restaurant: string;
    opinion?: string;
    image: string;
}

const SavedDishesSchema = new Schema<ISavedDishes>({
    name: {type: String, required: true},
    restaurant: {type: String, required: true},
    opinion: {type: String, required: true},
    image: {type: String, required: true},
})
export default SavedDishesSchema