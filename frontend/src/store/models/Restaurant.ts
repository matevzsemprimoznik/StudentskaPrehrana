import {ImageSourcePropType} from "react-native";


export interface Comment{
    userId: string,
    date: string
    comment: string
}

interface OpeningHours {
    monday: string,
    tuesday: string,
    wednesday: string,
    thursday: string,
    friday: string,
    saturday: string,
    sunday: string
    holiday: string
}

export interface Meal {
    name: string
    courses: string[]
    images?: string[]
    description?: string
    numberOfReviews?: number
    rating?: number
    comments?: Comment[]
}

export interface SavedMeal {
    id?: string
    name: string
    restaurant: string
    opinion?: string
    image?: string
}

export interface ISavedMealResponse {
    savedDishes: SavedMeal[]
}

export interface HomeRestaurant {
    _id: string;
    title: string,
    image?: ImageSourcePropType,
    rating?: number,
    numberOfReviews?: number,
}

export interface Restaurant extends HomeRestaurant {
    openingHours: OpeningHours
    address: string
    phone?: string
    menu: Meal[]
    price: number
    comments: Comment[]
}
