import React, {FC, useState} from 'react';
import {View, Pressable} from "react-native";
import { HeartIcon } from "react-native-heroicons/outline";

interface HeartProps {
    classname?: string;
    color: string;
    fill: string;
    size: number;
}
const Heart:FC<HeartProps> = ({ classname, color, fill, size }) => {
    const [active, setActive] = useState<boolean>(false);

    const handlePress = ():void => {
        setActive(!active);
    }

    return (
        <Pressable onPress={handlePress}>
            <View className={`bg-custom-white rounded-full flex justify-center items-center ${classname}`}>
                <HeartIcon color={color} fill={active ? fill : 'white'} size={size}/>
            </View>
        </Pressable>
    );
};

export default Heart;