import * as React from 'react';
import {createNavigationContainerRef, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "./src/screens/Home/Home";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Restaurant from "./src/screens/Restaurant/Restaurant";
import FoodDescriptionPage from "./src/screens/FoodDescriptionPage/FoodDescriptionPage";
import Router from "./src/components/Navigation/Router";

export default function App() {
    return (
        <SafeAreaProvider>
            <Router/>
        </SafeAreaProvider>
    );
}
