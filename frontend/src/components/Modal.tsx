import {Text, View} from "react-native";
import {FC} from "react";

interface ModalProps{
    naziv: string;
    children: any;
}

const Modal:FC<ModalProps> = ({ naziv, children}) => {
    return (
        <View className=' rounded-xl bg-custom-dark-gray absolute w-11/12'>
            <Text className='text-lg font-medium text-custom-white p-5'>{naziv}</Text>
            <View className='w-full rounded-xl bg-custom-white'>
                {children}
            </View>
        </View>
    )
}
export default Modal;