import Home from "../../screens/Home/Home";
import Restaurant from "../../screens/Restaurant/Restaurant";
import FoodDescriptionPage from "../../screens/FoodDescriptionPage/FoodDescriptionPage";
import {createNavigationContainerRef, NavigationContainer, NavigationState} from "@react-navigation/native";
import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Routes} from "../../../routes";
import {navigationRef} from "./NavigationBar";
import {useNavigationStore} from "../../store/navigation";
import {getEnumKeyByValue} from "../../utils/getEnumKeyByValue";


const Stack = createNativeStackNavigator();


const Router = () => {
    const setCurrentRoute = useNavigationStore(state => state.setCurrentRoute)

    const handleRouterStateChange = (state?: NavigationState) => {
        console.log(state)
        if(state){
            const route = getEnumKeyByValue<keyof typeof Routes>(Routes, state?.routeNames[state?.index])
            console.log(route)
            setCurrentRoute(Routes[route])
        }
    }

    return <NavigationContainer ref={navigationRef} onStateChange={handleRouterStateChange}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={Routes.HOME} component={Home}/>
            <Stack.Screen name={Routes.RESTAURANT} component={Restaurant}/>
            <Stack.Screen name={Routes.FOOD_DESCRIPTION_PAGE} component={FoodDescriptionPage}/>
        </Stack.Navigator>
    </NavigationContainer>
}
export default Router
