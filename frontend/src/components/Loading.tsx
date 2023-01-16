import {FC} from 'react';
import {ActivityIndicator, View} from "react-native";

interface LoadingProps {
    className?: string;
}
const Loading:FC<LoadingProps> = ({ className}) => {
    return (
        <View className={'h-full flex-1 justify-center items-center' + className}>
            <ActivityIndicator size={35} color={'#FEC532FF'}/>
        </View>
    );
};

export default Loading;