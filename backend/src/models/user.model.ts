import mongoose, {model, Schema} from "mongoose";
import SavedDishesSchema, {ISavedDishes} from "./savedDishes.model";

export interface IUser extends mongoose.Document {
    name: string;
    surname: string;
    email: string;
    uid: string;
    savedDishes?: ISavedDishes[]
}

const UserSchema = new Schema<IUser>({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    uid: {type: String, required: true},
    savedDishes: [SavedDishesSchema]
})

export default model<IUser>('User', UserSchema, 'user')