import React, {FC} from 'react';
import {Image, View} from 'react-native';
import {PhotoIcon} from "react-native-heroicons/solid";
import {REST_URI} from "@env";

interface FoodImageCircleProps {
    foodImages:  string[] | undefined;
}
const FoodImageCircle:FC<FoodImageCircleProps> = ({ foodImages }) => {
    return <View className='flex-row justify-center'>
        {foodImages && foodImages[0] != null ? <Image source={{uri: `${REST_URI}/images/dishes/${foodImages[0]}`}} className='rounded-full w-48 h-48'/> : <View className='rounded-full w-48 h-48 flex flex-row justify-center items-center' style={{alignItems: 'center'}}><PhotoIcon size={30} color={'#d5d5d5'}/></View>}
    </View>

};

export default FoodImageCircle;