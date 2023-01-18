export interface Comment{
    userId: string,
    date: string
    comment: string
}

export interface Coordinates {
    latitude: number,
    longitude: number
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
    ratings: Rating[]
    comments: Comment[]
    saved?: boolean
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
    extras: string[]
    _id: string;
    title: string,
    image?: string,
    ratings: Rating[]
}

export interface Restaurant extends HomeRestaurant {
    coordinates: Coordinates
    openingHours: OpeningHours
    address: string
    phone?: string
    menu: Meal[]
    price: string;
    comments: Comment[]
}

export interface Rating{
    userId: string,
    rating: string
}

export interface CommentSend {
    restaurantId: string,
    comment: string,
}

export interface RatingSend {
    restaurantId: string,
    rating: number,
}

export interface CommentDishSend extends CommentSend {
    dishName: string
}

export interface RatingDishSend extends RatingSend {
    dishName: string
}
