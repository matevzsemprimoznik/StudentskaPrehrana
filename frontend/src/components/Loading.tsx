import {FC} from 'react';
import {ActivityIndicator, View} from "react-native";

interface LoadingProps {
    className?: string;
}
const Loading:FC<LoadingProps> = ({ className}) => {
    return (
        <View className={className}>
            <ActivityIndicator/>
        </View>
    );
};

export default Loading;