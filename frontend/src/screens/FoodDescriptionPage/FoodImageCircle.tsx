import React, {FC} from 'react';
import {Image, ImageSourcePropType} from 'react-native';

interface FoodImageCircleProps {
    foodImage:  ImageSourcePropType;
}
const FoodImageCircle:FC<FoodImageCircleProps> = ({ foodImage }) => {
    return (
        <>
            <Image source={foodImage} className='rounded-full w-52 h-52'/>
        </>
    );
};

export default FoodImageCircle;