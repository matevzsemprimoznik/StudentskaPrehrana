import React, {FC} from 'react';
import {View, Pressable} from "react-native";
import { HeartIcon } from "react-native-heroicons/outline";

interface HeartProps {
    classname?: string;
    color: string;
    fill: string;
    size: number;
    onPress: () => void;
    active: boolean;
}
const Heart:FC<HeartProps> = ({ classname, fill, size, onPress , active }) => {

    return (
        <Pressable onPress={onPress} >
            <View className={`bg-custom-white rounded-full flex justify-center items-center ${classname}`}>
                <HeartIcon color='#D69D9F' fill={active ? fill : 'white'} size={size}/>
            </View>
        </Pressable>
    );
};

export default Heart;