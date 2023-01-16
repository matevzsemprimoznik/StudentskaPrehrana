import User, {IUser} from "../models/user.model";
import {ISavedDishes} from "../models/savedDishes.model";

const addUser = async (user: IUser) => {
    return User.create(user);
}

const getByUid = async (uid: string) => {
    return User.findOne({ uid: uid });
}

const getById = async (id: string) => {
    return User.findById(id);
}

const updateById = async (id: string, user: IUser) => {
    return User.updateOne({ _id: id }, user);
}

const saveDish = async (id: string, dish: ISavedDishes) => {
    return User.updateOne({ _id: id }, { $push: { savedDishes: dish } })
}

const getSavedDishes = async (id: string) => {
    return User.findOne({ _id: id }).select({ _id: 0, savedDishes: 1})
}

const removeSavedDish = async (id: string, dishName: string) => {

    return User.updateOne({ _id: id }, { $pull: { savedDishes: { name: dishName } } })
    /*
    User.updateOne(
        { _id: id },
        { $pull: { savedDishes: { name: dishName } } }
    )
     */
    //findOneAndDelete
}

export default {
    addUser,
    getByUid,
    getById,
    updateById,
    saveDish,
    getSavedDishes,
    removeSavedDish
}