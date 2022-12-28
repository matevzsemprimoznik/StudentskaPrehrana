import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Router from "./src/components/Navigation/Router";

export default function App() {
    return (
        <SafeAreaProvider>
            <Router/>
        </SafeAreaProvider>
    );
}
