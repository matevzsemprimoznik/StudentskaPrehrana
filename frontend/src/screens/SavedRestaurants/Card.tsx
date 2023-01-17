import {FC} from "react";
import {Image, Text, View} from "react-native";
import {HomeIcon, PhotoIcon} from "react-native-heroicons/solid";
import {REST_URI} from "@env";
import {navigationRef} from "../../components/Navigation/NavigationBar";

interface Dish{
    name: string;
    restaurant: string;
    opinion?:  string;
    image?:  string;
}
interface CardProps{
    dish: Dish;
}

const Card:FC<CardProps> = ({dish}) => {
    return (
        <View className='rounded-xl w-full mb-4 h-32 bg-custom-white flex flex-row'>
            {dish.image ? <Image source={{uri: `${REST_URI}/images/dishes/${dish.image}`}} className='rounded-l-xl h-full basis-1/3 '/> : <View className='w-28 justify-center' style={{alignItems: 'center'}}><PhotoIcon size={30} color={'#d5d5d5'}/></View>}
            <View className='basis-2/3 pt-2 pl-3'>
                <View className='flex-row justify-between items-center m-2.5 mb-3'>
                    <Text className='text-md font-medium'>{dish.name}</Text>
                </View>
                <View className='flex-row items-center mx-2.5 mb-5'>
                    <HomeIcon color="#D69D9F" size={18}/>
                    <Text className='opacity-50 ml-2'>{dish.restaurant}</Text>
                </View>
            </View>
        </View>
    )
}

export default Card;