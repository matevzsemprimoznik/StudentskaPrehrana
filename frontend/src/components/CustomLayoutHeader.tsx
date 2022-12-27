import {Image, StatusBar, View} from "react-native";
import {FC, ReactNode} from "react";
import DefaultBackgroundImage from '../assets/main.png'

export interface CustomLayoutHeaderProps {
    children: ReactNode
    classname?: string
    backgroundImage?: any
    statusBarColor?: string
}

const CustomLayoutHeader:FC<CustomLayoutHeaderProps> = ({children, statusBarColor, backgroundImage, classname = ''}) => {
    return <>
        <StatusBar backgroundColor={statusBarColor ? statusBarColor : '#FEC532'}/>
        <View className={`h-60 w-full ${classname}`}>
        <View className={`absolute w-full flex-row justify-center ${backgroundImage ? '' : 'bg-custom-yellow'}`}>
            <Image className='h-60 w-full' source={backgroundImage ? backgroundImage : DefaultBackgroundImage}/>
        </View>
        {children}
    </View></>
}

export default CustomLayoutHeader;