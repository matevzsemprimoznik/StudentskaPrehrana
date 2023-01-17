import {FC} from 'react';
import {ActivityIndicator, View} from "react-native";

interface LoadingProps {
    className?: string;
    color?: string;
    size?: number
}
const Loading:FC<LoadingProps> = ({ className, color, size}) => {
    return (
        <View className={'h-full flex-1 justify-center items-center' + className}>
            <ActivityIndicator size={size ? size : 35} color={color ? color : '#FEC532FF'}/>
        </View>
    );
};

export default Loading;