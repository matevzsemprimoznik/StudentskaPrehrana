import Home from "../../screens/Home/Home";
import Restaurant from "../../screens/Restaurant/Restaurant";
import FoodDescriptionPage from "../../screens/FoodDescriptionPage/FoodDescriptionPage";
import {createNavigationContainerRef, NavigationContainer} from "@react-navigation/native";
import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Routes} from "../../../routes";
import {navigationRef} from "./NavigationBar";


const Stack = createNativeStackNavigator();


const Router = () => {
    return <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={Routes.HOME} component={Home}/>
            <Stack.Screen name={Routes.RESTAURANT} component={Restaurant}/>
            <Stack.Screen name={Routes.FOOD_DESCRIPTION_PAGE} component={FoodDescriptionPage}/>
        </Stack.Navigator>
    </NavigationContainer>
}
export default Router
