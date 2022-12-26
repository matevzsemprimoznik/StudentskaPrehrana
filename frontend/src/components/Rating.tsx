import {FC} from "react";
import {Text, View} from "react-native";
import { StarIcon } from "react-native-heroicons/outline";

interface RatingProps{
    rating: number;
    numberOfReviews: number;
    color?: string;
}
const Rating:FC<RatingProps> = ({ rating, numberOfReviews ,color}) => {
    return (
        <View className='flex-row'>
            <StarIcon color="yellow" size={15}/>
            <Text className={`text-xs ${color}`}>{rating} ({numberOfReviews})</Text>
        </View>
    )
}
export default Rating