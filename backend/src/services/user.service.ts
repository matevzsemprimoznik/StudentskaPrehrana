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

export default {
    addUser,
    getByUid,
    getById
}