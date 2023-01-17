import Home from "../../screens/Home/Home";
import Restaurant from "../../screens/Restaurant/Restaurant";
import FoodDescriptionPage from "../../screens/FoodDescriptionPage/FoodDescriptionPage";
import {NavigationContainer, NavigationState} from "@react-navigation/native";
import * as React from "react";
import {useMemo, useRef} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {initialRoute, Routes, routesWithoutNavigation} from "../../../routes";
import NavigationBar, {navigationRef} from "./NavigationBar";
import {useNavigationStore} from "../../store/navigation";
import Login from "../../screens/Login/Login";
import Register from "../../screens/Register/Register";
import {useSafeAreaFrame, useSafeAreaInsets} from "react-native-safe-area-context";
import {StatusBar, View} from "react-native";
import Map from "../../screens/Map/Map";
import Profile from "../../screens/Profille/Profile";
import SavedRestaurants from "../../screens/SavedRestaurants/SavedDishes";
import ProtectedRoute from "../../utils/ProtectedRoute";
import {Coordinates, Meal} from "../../store/models/Restaurant";
import {auth} from "../../config/firebase";

export type RootStackParamList = {
    [Routes.HOME]: undefined;
    [Routes.FOOD_DESCRIPTION_PAGE]: { dish: Meal, price: string, restaurantID: string, restaurantName: string };
    [Routes.RESTAURANT]: { restaurantID: string };
    [Routes.LOGIN]: undefined;
    [Routes.REGISTER]: undefined;
    [Routes.MAP]: Coordinates;
    [Routes.PROFILE]: undefined;
    [Routes.SAVED_DISHES]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {
    const {currentRoute, setCurrentRoute} = useNavigationStore()
    const hideNavigationBar = useMemo(() => routesWithoutNavigation.includes(currentRoute) || (currentRoute === Routes.PROFILE && !auth.currentUser), [currentRoute])

    const frame = useSafeAreaFrame()
    const insets = useSafeAreaInsets();
    const initialFrame = useRef(frame)

    const getCurrentRoute = (
        state: NavigationState | Required<NavigationState['routes'][0]>['state'],
    ): Routes | undefined => {
        if (state.index === undefined || state.index < 0) {
            return undefined;
        }
        const nestedState = state.routes[state.index].state;
        if (nestedState !== undefined) {
            return getCurrentRoute(nestedState);
        }
        return state.routes[state.index].name as Routes;
    };

    const handleRouterStateChange = (state?: NavigationState) => {
        if (state) {
            const currentRoute = getCurrentRoute(state)
            if (currentRoute)
                setCurrentRoute(currentRoute)
        }
    }

    return <View className='flex-1'>
        <View className='absolute top-0 left-0 right-0 -z-50 bg-custom-yellow' style={{height: insets.top}}/>
        <StatusBar barStyle='dark-content' backgroundColor='#FEC532FF'/>
        <View className='bg-custom-yellow' style={{
            height: initialFrame.current.height - insets.top - insets.bottom - (hideNavigationBar ? 0 : 60),
            marginTop: insets.top
        }}>
            <NavigationContainer ref={navigationRef} onStateChange={handleRouterStateChange}>
                <Stack.Navigator initialRouteName={initialRoute} screenOptions={{headerShown: false}}>
                    <Stack.Screen name={Routes.HOME} component={Home}/>
                    <Stack.Screen name={Routes.FOOD_DESCRIPTION_PAGE} component={FoodDescriptionPage}/>
                    <Stack.Screen name={Routes.RESTAURANT} component={Restaurant}/>
                    <Stack.Screen name={Routes.LOGIN} component={Login}/>
                    <Stack.Screen name={Routes.REGISTER} component={Register}/>
                    <Stack.Screen name={Routes.MAP} component={Map}/>
                    <Stack.Screen name={Routes.PROFILE} children={() => <ProtectedRoute><Profile/></ProtectedRoute>}/>
                    <Stack.Screen name={Routes.SAVED_DISHES} component={SavedRestaurants}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
        {!hideNavigationBar && <NavigationBar/>}
    </View>
}
export default Router
