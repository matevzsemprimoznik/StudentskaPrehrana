import {FC} from "react";
import {Image, ImageSourcePropType, Text, View} from "react-native";
import Rating from "../../components/Rating";
import {HomeIcon, ChatBubbleLeftEllipsisIcon} from "react-native-heroicons/solid";



interface Dish{
    name: string;
    restaurant: string;
    rating: number;
    numberOfReviews: number;
    comment:  string;
    image:  ImageSourcePropType;
}
interface CardProps{
    dish: Dish;
    navigation: any;
}

const Card:FC<CardProps> = ({dish, navigation}) => {
    return (
        <View className='rounded-xl w-full mb-4 bg-custom-white flex flex-row' onTouchEnd={() => navigation.navigate('FoodDescriptionPage')}>
            <Image source={dish.image} className='rounded-l-xl h-full basis-1/3 '/>
            <View className='basis-2/3'>
                <View className='flex-row justify-between items-center m-2.5'>
                    <Text className='text-lg font-medium'>{dish.name}</Text>
                    <Rating rating={dish.rating} numberOfReviews={dish.numberOfReviews} />
                </View>
                <View className='flex-row items-center mx-2.5  mt-2 '>
                    <HomeIcon color="#D69D9F" size={18}/>
                    <Text className='opacity-50 ml-2'>{dish.restaurant}</Text>
                </View>

                <View className='flex-row items-center mx-2.5  my-2 '>
                    <ChatBubbleLeftEllipsisIcon color="#45AAE3" size={18}/>
                    <Text className='opacity-50 ml-2'>{dish.comment}</Text>
                </View>
            </View>
        </View>
    )
}

export default Card;