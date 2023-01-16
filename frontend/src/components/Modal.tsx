import {
    Animated, Dimensions,
    GestureResponderEvent,
    Pressable,
    Text,
    View
} from "react-native";
import {FC, useEffect, useRef} from "react";
import {XMarkIcon} from "react-native-heroicons/solid";


interface ModalProps{
    naziv: string;
    children: any;
    onPress: () => void;
}

const Modal:FC<ModalProps> = ({ naziv, children, onPress}) => {
    const offset = Dimensions.get('window').height
    const fadeAnimationValue = useRef(new Animated.Value(0)).current;
    const translateValue = useRef(new Animated.Value(offset)).current;

    const startAnimation = () => {
        Animated.timing(fadeAnimationValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start()
        Animated.timing(translateValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start()
    }

    const endAnimation = () => {
        Animated.timing(fadeAnimationValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start()
        Animated.timing(translateValue, {
            toValue: offset,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }

    const onPressHandler = (e: GestureResponderEvent) => {
        e.stopPropagation()
        onPress()
    }

    useEffect(() => {
        startAnimation()
    }, [naziv, children, onPress])

    const fadeInterpolation = fadeAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange:['#00000000', 'rgba(0,0,0,0.45)']
    })

    return (
        <Pressable onPress={onPressHandler} className='w-full h-full flex-row justify-center absolute' style={{alignItems: 'center'}}>
                <Animated.View className='w-full h-full flex-row justify-center absolute' style={{alignItems: 'center', backgroundColor: fadeInterpolation}}>
                    <Animated.View className='rounded-xl bg-custom-dark-gray absolute w-11/12' style={{transform: [{translateY: translateValue}]}} onStartShouldSetResponder={() => true}>
                        <View className='flex-row items-center justify-between p-5'>
                            <Text className='text-lg font-medium text-custom-white'>{naziv}</Text>
                            <XMarkIcon onPress={onPressHandler} color="#FFFFFF" size={30}/>
                        </View>
                        <View className='w-full rounded-xl bg-custom-white' onStartShouldSetResponder={() => true}>
                            {children}
                        </View>
                    </Animated.View>
                </Animated.View>
        </Pressable>

    )
}
export default Modal;