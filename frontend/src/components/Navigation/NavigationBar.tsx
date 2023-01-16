import {TouchableOpacity, View} from "react-native";
import {HeartIcon, HomeIcon, UserIcon} from "react-native-heroicons/solid";
import {memo, useMemo, useState} from "react";
import {Routes} from "../../../routes";
import {createNavigationContainerRef} from "@react-navigation/native";
import {useNavigationStore} from "../../store/navigation";


export const navigationRef = createNavigationContainerRef()

const NavigationBar = () => {
    const currentRoute = useNavigationStore(state => state.currentRoute)

    const redirectTo = (route: Routes) => {
        navigationRef.navigate(route as never)
    }

    console.log(currentRoute)

    return <View className='w-full rounded-t-lg bg-custom-white' style={{height: 60, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => redirectTo(Routes.PROFILE)} className='flex-1 justify-center align-middle' style={{ height: '100%', alignItems: 'center'}}>
            <UserIcon fill={currentRoute === Routes.PROFILE ? '#FEC532' : '#d2d2d2'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => redirectTo(Routes.HOME)} className='bg-transparent flex-1 justify-center align-middle' style={{ height: '100%', alignItems: 'center'}}>
            <HomeIcon fill={currentRoute === Routes.HOME ? '#FEC532' : '#d2d2d2'} size={30}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => redirectTo(Routes.SAVED_DISHES)} className='bg-transparent flex-1 justify-center align-middle' style={{ height: '100%', alignItems: 'center'}}>
            <HeartIcon fill={currentRoute === Routes.SAVED_DISHES ? '#FEC532' : '#d2d2d2'}/>
        </TouchableOpacity>
    </View>
}
export default memo(NavigationBar)