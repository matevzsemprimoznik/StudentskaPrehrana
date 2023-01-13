import {FC} from "react";
import {Image, Text, View} from "react-native";
import {HomeIcon, PhotoIcon} from "react-native-heroicons/solid";
import {REST_URI} from "@env";

interface Dish{
    name: string;
    restaurant: string;
    opinion?:  string;
    image?:  string;
}
interface CardProps{
    dish: Dish;
    navigation: any;
}

const Card:FC<CardProps> = ({dish, navigation}) => {
    return (
        <View className='rounded-xl w-full mb-4 bg-custom-white flex flex-row' onTouchEnd={() => navigation.navigate('FoodDescriptionPage')}>
            {dish.image ? <Image source={{uri: `${REST_URI}/images/${dish.image}`}} className='rounded-l-xl h-full basis-1/3 '/> : <View className='w-28 justify-center' style={{alignItems: 'center'}}><PhotoIcon size={30} color={'#d5d5d5'}/></View>}
            <View className='basis-2/3'>
                <View className='flex-row justify-between items-center m-2.5'>
                    <Text className='text-lg font-medium'>{dish.name}</Text>
                </View>
                <View className='flex-row items-center mx-2.5  mb-5'>
                    <HomeIcon color="#D69D9F" size={18}/>
                    <Text className='opacity-50 ml-2'>{dish.restaurant}</Text>
                </View>
            </View>
        </View>
    )
}

export default Card;