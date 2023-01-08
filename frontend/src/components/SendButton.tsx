import React, {FC} from 'react';
import {View} from "react-native";
import {PaperAirplaneIcon} from "react-native-heroicons/solid";

interface ButtonProps {
    onPress: () => void;
}
const SendButton:FC<ButtonProps> = ({ onPress }) => {
    return (
        <View className='bg-custom-blue rounded-full h-12 w-16 ml-3 flex items-center justify-center' onTouchEnd={onPress}>
            <PaperAirplaneIcon color="white" size={18}/>
        </View>
    );
};

export default SendButton;