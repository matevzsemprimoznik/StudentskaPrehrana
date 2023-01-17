import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {PaperAirplaneIcon} from "react-native-heroicons/solid";
import Loading from "./Loading";

interface ButtonProps {
    onPress: () => void;
    loading?: boolean;
    text?: string
    buttonClassname?: string;
    textClassname?: string;
}

const SendButton:FC<ButtonProps> = ({ onPress, loading, text, buttonClassname= '', textClassname= ''}) => {
    return (
        <TouchableOpacity className={buttonClassname} onPress={onPress}>
            {loading ? <Loading color='white' size={20}/> : text ? <Text className={textClassname}>{text}</Text> : <PaperAirplaneIcon color="white" size={18}/>}
        </TouchableOpacity>
    );
};

export default SendButton;