import {FC} from "react";
import {Image, Text, View} from "react-native";
import StarIcon from "../assets/star.png";

interface RatingProps{
    rating: number;
    numberOfReviews: number;
}
const Rating:FC<RatingProps> = ({ rating, numberOfReviews }) => {
    return (
        <View className='flex-row'>
            <Image source={StarIcon} className='mt-0.5 mr-1'/>
            <Text className='text-custom-white text-xs'>{rating} ({numberOfReviews})</Text>
        </View>
    )
}
export default Rating