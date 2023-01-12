import User, {IUser} from "../models/user.model";

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

export default {
    addUser,
    getByUid,
    getById,
    updateById
}