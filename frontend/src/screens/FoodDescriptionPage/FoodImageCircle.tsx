import React, {FC} from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';

interface FoodImageCircleProps {
    foodImage:  ImageSourcePropType;
}
const FoodImageCircle:FC<FoodImageCircleProps> = ({ foodImage }) => {
    return <View className='flex-row justify-center'>
        <Image source={foodImage} className='rounded-full w-48 h-48'/>
    </View>

};

export default FoodImageCircle;