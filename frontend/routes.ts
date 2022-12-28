export enum Routes {
    HOME = 'home',
    RESTAURANT = 'restaurant',
    FOOD_DESCRIPTION_PAGE = 'foodDescriptionPage',
}

export const getRouteKeyByValue = (value: string) => {
    const indexOf = Object.values(Routes).indexOf(value as unknown as Routes);

    const key = Object.keys(Routes)[indexOf];

    return key as Routes;
}