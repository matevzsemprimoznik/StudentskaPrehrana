import {FC, useMemo} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import Rating from "../../components/Rating";
import {Routes} from "../../../routes";
import {navigationRef} from "../../components/Navigation/NavigationBar";
import {REST_URI} from "@env";
import {PhotoIcon} from 'react-native-heroicons/solid'
import {HomeRestaurant} from "../../store/models/Restaurant";

interface CardProps {
    restaurant: HomeRestaurant;
    ratingColor?: string;
}

const Card: FC<CardProps> = ({restaurant, ratingColor}) => {
    const ratingRounded = useMemo(() => {
        if (restaurant && restaurant.ratings && restaurant.ratings.length) {
            const sum = restaurant.ratings.reduce((sum, rating) => sum + parseFloat(rating.rating), 0);
            const avgRating = sum / restaurant.ratings.length;
            return Math.round(avgRating);
        }
        return 0;
    }, [restaurant])

    return (
        <TouchableOpacity className='rounded-xl w-1/2 h-48 px-2 mb-4' style={{alignSelf: "flex-start"}}
                          onPress={() => navigationRef.navigate(Routes.RESTAURANT as never, {restaurantID: restaurant._id} as never )}>
            {restaurant.image ?
                <Image className='rounded-xl w-full h-full' source={{uri: `${REST_URI}/images/restaurants/${restaurant.image}`}}/> :
                <View className='pt-10 rounded-xl bg-gray-300 w-full h-full' style={{alignItems: 'center'}}><PhotoIcon
                    size={30} color={'white'}/></View>}
            <View className='absolute bottom-5 left-5'>
                <Text className='text-lg text-custom-white mb-1 leading-5 pr-4'>{restaurant.title}</Text>
                <Rating rating={ratingRounded || 0} numberOfReviews={restaurant.ratings.length || 0}
                        color={ratingColor}/>
            </View>
        </TouchableOpacity>
    )
}

export default Card;