import {SafeAreaProvider} from 'react-native-safe-area-context';
import Router from "./src/components/Navigation/Router";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
                <Router/>
            </SafeAreaProvider>
        </QueryClientProvider>
    );
}
