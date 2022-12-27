import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "./src/screens/Home/Home";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Restaurant from "./src/screens/Restaurant/Restaurant";
import FoodDescriptionPage from "./src/screens/FoodDescriptionPage/FoodDescriptionPage";
import Login from "./src/screens/Login/Login";


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Restaurant" component={Restaurant}/>
                <Stack.Screen name="FoodDescriptionPage" component={FoodDescriptionPage} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
        </SafeAreaProvider>
    );
}
