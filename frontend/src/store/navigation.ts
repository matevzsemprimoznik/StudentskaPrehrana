import create from 'zustand'
import {Routes} from "../../routes";

interface NavigationState {
    currentRoute: Routes
    setCurrentRoute: (route: Routes) => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
    currentRoute: Routes.HOME,
    setCurrentRoute: (route: Routes) => set({currentRoute: route}),
}))