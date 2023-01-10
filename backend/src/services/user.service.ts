import User, {IUser} from "../models/user.model";

const addUser = async (user: IUser) => {
    return User.create(user);
}

export default {
    addUser
}