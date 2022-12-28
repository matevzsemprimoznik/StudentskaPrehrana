import {View} from "react-native";
import {HeartIcon, HomeIcon, UserIcon} from "react-native-heroicons/solid";
import {memo, useMemo, useState} from "react";
import {navigationRef} from "./Router";
import {Routes} from "../../../routes";


const NavigationBar = () => {
    const [selectedRoute, setSelectedRoute] = useState<Routes>(Routes.HOME)

    console.log(selectedRoute)
    const redirectTo = (route: Routes) => {
        setSelectedRoute(route)
        navigationRef.navigate(route as never)
    }

    return <View className='w-full rounded-t-lg bg-custom-white' style={{height: 60, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <HeartIcon fill={selectedRoute === Routes.RESTAURANT ? '#FEC532' : '#d2d2d2'} onPress={() => redirectTo(Routes.RESTAURANT)}/>
        <HomeIcon fill={selectedRoute === Routes.HOME ? '#FEC532' : '#d2d2d2'} size={30} onPress={() => redirectTo(Routes.HOME)}/>
        <UserIcon fill={selectedRoute === Routes.RESTAURANT ? '#FEC532' : '#d2d2d2'} onPress={() => redirectTo(Routes.RESTAURANT)}/>
    </View>
}
export default memo(NavigationBar)