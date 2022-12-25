import {FC} from "react";
import {Text, View} from "react-native";
import { StarIcon } from "react-native-heroicons/solid";

interface RatingProps{
    rating: number;
    numberOfReviews: number;
}
const Rating:FC<RatingProps> = ({ rating, numberOfReviews }) => {
    return (
        <View className='flex-row'>
            <StarIcon fill="yellow" size={15}/>
            <Text className='text-custom-white text-xs'>{rating} ({numberOfReviews})</Text>
        </View>
    )
}
export default Rating