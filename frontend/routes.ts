export enum Routes {
    HOME = 'home',
    RESTAURANT = 'restaurant',
    FOOD_DESCRIPTION_PAGE = 'foodDescriptionPage',
    LOGIN = 'login',
    REGISTER = 'register',
    MAP = 'map',
    PROFILE = 'profile',
    SAVED_DISHES = 'savedDishes',
}

export const routesWithoutNavigation = [Routes.LOGIN, Routes.REGISTER];

export const initialRoute = Routes.HOME;