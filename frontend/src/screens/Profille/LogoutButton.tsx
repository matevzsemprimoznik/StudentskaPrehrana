import {ArrowRightOnRectangleIcon} from "react-native-heroicons/outline";
import {TouchableOpacity} from "react-native";
import {auth} from "../../config/firebase";
import Toast from "react-native-root-toast";
import {translate} from "../../utils/translations/translate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Routes} from "../../../routes";
import {navigationRef} from "../../components/Navigation/NavigationBar";
import instance from "../../utils/axios";


const LogoutButton = () => {
    const logout = async () => {
        try {
            await auth.signOut()
            await AsyncStorage.removeItem('user');
            navigationRef.navigate(Routes.HOME as never)
            instance.defaults.headers.common['Authorization'] = ``;
        } catch (e) {
            Toast.show(translate('signout-error'))
        }
    }
    return <TouchableOpacity className='' onPress={logout}><ArrowRightOnRectangleIcon size={30}
                                                                                      color={'white'}/></TouchableOpacity>
}

export default LogoutButton;