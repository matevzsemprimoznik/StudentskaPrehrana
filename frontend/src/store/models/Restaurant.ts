import {ImageSourcePropType} from "react-native";

export interface HomeRestaurant{
    title: string,
    image?: ImageSourcePropType,
    rating?: number,
    numberOfReviews?: number,
    extras: string[]
}