import {
    GestureResponderEvent,
    GestureResponderHandlers,
    Pressable,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {FC} from "react";

interface ModalProps{
    naziv: string;
    children: any;
    onPress: () => void;
}

const Modal:FC<ModalProps> = ({ naziv, children, onPress}) => {
    const onPressHandler = (e: GestureResponderEvent) => {
        e.stopPropagation()
        onPress()
    }

    return (
        <Pressable onPress={onPressHandler} className='w-full h-full flex-row justify-center absolute' style={{alignItems: 'center', backgroundColor: 'rgba(51,51,51,0.4)'}}>
                <View className='rounded-xl bg-custom-dark-gray absolute w-11/12' onStartShouldSetResponder={() => true}>
                    <Text className='text-lg font-medium text-custom-white p-5'>{naziv}</Text>
                    <View className='w-full rounded-xl bg-custom-white' onStartShouldSetResponder={() => true}>
                        {children}
                    </View>
                </View>
        </Pressable>

    )
}
export default Modal;