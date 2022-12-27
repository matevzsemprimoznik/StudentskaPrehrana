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
            <StarIcon color="#FEC532" size={18}/>
            <Text className={`font-medium text-xs ${color} mt-0.5 ml-1`}>{rating} ({numberOfReviews})</Text>
        </View>
    )
}
export default Rating