import {FC} from "react";
import {Image, ImageSourcePropType, Text, View} from "react-native";
import Rating from "../../components/Rating";
import {Routes} from "../../../routes";
import {navigationRef} from "../../components/Navigation/NavigationBar";

interface Restaurant{
    name: string;
    rating: number;
    numberOfReviews: number;
    image:  ImageSourcePropType;
}
interface CardProps{
    restaurant: Restaurant;
    ratingColor?: string;
}

const Card:FC<CardProps> = ({restaurant, ratingColor}) => {
    return (
        <View className='rounded-xl w-1/2 h-48 px-2 mb-4' style={{alignSelf: "flex-start"}} onTouchEnd={() => navigationRef.navigate(Routes.RESTAURANT as never)}>
            <Image source={restaurant.image} className='rounded-xl w-full h-max'/>
            <View className='absolute bottom-5 left-5'>
                <Text className='text-xl text-custom-white mb-1'>{restaurant.name}</Text>
                <Rating rating={restaurant.rating} numberOfReviews={restaurant.numberOfReviews} color={ratingColor}/>
            </View>
        </View>
    )
}

export default Card;