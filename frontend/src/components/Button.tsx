import React, {FC, ReactNode} from 'react';
import {Pressable, Text, View} from "react-native";

interface ButtonProps {
    children?: ReactNode;
    text: string;
    onPress: () => void;
    classname?: string;
    disabled?: boolean;
}
const Button:FC<ButtonProps> = ({ children, text, onPress, classname }) => {
    return (
        <View className='bg-custom-blue font-bold py-2 px-4 rounded'>
            <Pressable onPress={onPress}>
                <Text className='text-white'>{text}</Text>
            </Pressable>
            {children}
        </View>
    );
};

export default Button;