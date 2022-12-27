import {FC} from "react";
import {Image, ImageSourcePropType, Text, View} from "react-native";

interface Dish{
    name: string;
    description: string;
    rating: number;
    numberOfReviews: number;
    image:  ImageSourcePropType;
}
interface CardProps{
    dish: Dish;
    navigation: any;
}

const Card:FC<CardProps> = ({dish, navigation}) => {
    return (
        <View className='rounded-xl w-full h-36 px-2 mb-4 bg-custom-white flex flex-row' onTouchEnd={() => navigation.navigate('FoodDescriptionPage')}>
            <Image source={dish.image} className='rounded-xl h-full basis-1/3 '/>
            <View className='basis-2/3'>
                <Text className='text-lg font-medium mb-2 mt-6 ml-2.5'>{dish.name}</Text>
                <Text className=' font-medium mb-5 text-custom-gray mt-2 ml-2.5'>{dish.description}</Text>
                <Image source={require('../../assets/heart.png')} className='absolute top-5 right-4'/>
            </View>
        </View>
    )
}

export default Card;