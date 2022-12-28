import {SafeAreaProvider} from 'react-native-safe-area-context';
import Router from "./src/components/Navigation/Router";
import NavigationBar from "./src/components/Navigation/NavigationBar";

export default function App() {
    return (
        <SafeAreaProvider>
            <Router/>
            <NavigationBar/>
        </SafeAreaProvider>
    );
}
