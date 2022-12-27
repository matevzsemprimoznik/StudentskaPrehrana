import {FC} from "react";
import {Image, ImageSourcePropType, Text, View} from "react-native";
import Rating from "../../components/Rating";
import {HeartIcon} from "react-native-heroicons/outline";


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
        <View className='rounded-xl w-full mb-4 bg-custom-white flex flex-row' onTouchEnd={() => navigation.navigate('FoodDescriptionPage')}>
            <Image source={dish.image} className='rounded-l-xl h-full basis-1/3 '/>
            <View className='basis-2/3'>
                <Text className='text-lg font-medium mb-2 mt-6 ml-2.5'>{dish.name}</Text>
                <Text className='mb-10 text-custom-gray mt-2 mx-2.5'>{dish.description}</Text>
                <View className='absolute top-3 right-3'>
                    <HeartIcon color="#E7E7E7" size={30}/>
                </View>
                <View className='absolute bottom-3 right-3	'>
                    <Rating rating={dish.rating} numberOfReviews={dish.numberOfReviews} />
                </View>

            </View>
        </View>
    )
}

export default Card;