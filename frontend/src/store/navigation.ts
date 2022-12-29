import create from 'zustand'
import {initialRoute, Routes} from "../../routes";

interface NavigationState {
    currentRoute: Routes
    setCurrentRoute: (route: Routes) => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
    currentRoute: initialRoute,
    setCurrentRoute: (route: Routes) => set({currentRoute: route}),
}))