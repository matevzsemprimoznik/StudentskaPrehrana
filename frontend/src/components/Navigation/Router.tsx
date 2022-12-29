import Home from "../../screens/Home/Home";
import Restaurant from "../../screens/Restaurant/Restaurant";
import FoodDescriptionPage from "../../screens/FoodDescriptionPage/FoodDescriptionPage";
import {createNavigationContainerRef, NavigationContainer, NavigationState} from "@react-navigation/native";
import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {initialRoute, Routes, routesWithoutNavigation} from "../../../routes";
import NavigationBar, {navigationRef} from "./NavigationBar";
import {useNavigationStore} from "../../store/navigation";
import {getEnumKeyByValue} from "../../utils/getEnumKeyByValue";
import Login from "../../screens/Login/Login";
import Register from "../../screens/Register/Register";
import Route from "./Route";
import {useSafeAreaFrame, useSafeAreaInsets} from "react-native-safe-area-context";
import {useMemo, useRef} from "react";
import {View} from "react-native";


const Stack = createNativeStackNavigator();


const Router = () => {
    const {currentRoute, setCurrentRoute} = useNavigationStore()
    const showNavigationBar = useMemo(() => !routesWithoutNavigation.includes(currentRoute), [currentRoute])

    const frame = useSafeAreaFrame()
    const insets = useSafeAreaInsets();
    const initialFrame = useRef(frame)

    const handleRouterStateChange = (state?: NavigationState) => {
        if (state) {
            const route = getEnumKeyByValue<keyof typeof Routes>(Routes, state?.routeNames[state?.index])
            setCurrentRoute(Routes[route])
        }
    }

    return <View className='flex-1'>
        <View className='absolute top-0 left-0 right-0 -z-50 bg-custom-yellow' style={{height: insets.top}}/>
        <View className='bg-custom-yellow' style={{height: initialFrame.current.height - insets.top - insets.bottom - (showNavigationBar ? 60 : 0), marginTop: insets.top}}>
            <NavigationContainer ref={navigationRef} onStateChange={handleRouterStateChange}>
                <Stack.Navigator initialRouteName={initialRoute} screenOptions={{headerShown: false}}>
                    <Stack.Screen name={Routes.HOME} component={Home}/>
                    <Stack.Screen name={Routes.RESTAURANT} component={Restaurant}/>
                    <Stack.Screen name={Routes.FOOD_DESCRIPTION_PAGE} component={FoodDescriptionPage}/>
                    <Stack.Screen name={Routes.LOGIN} component={Login}/>
                    <Stack.Screen name={Routes.REGISTER} component={Register}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
        {showNavigationBar && <NavigationBar/>}
    </View>
}
export default Router
