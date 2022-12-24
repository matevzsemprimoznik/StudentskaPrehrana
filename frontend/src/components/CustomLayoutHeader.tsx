import {Image, View} from "react-native";
import {FC, ReactElement, ReactNode} from "react";
import BackgroundImage from '../assets/main.png'

export interface CustomLayoutHeaderProps {
    children: ReactNode
}

const CustomLayoutHeader:FC<CustomLayoutHeaderProps> = ({children}) => {
    return <View className='h-2/6 bg-custom-yellow'>
        <Image className='w-5/6 m-auto mt-5 absolute -z-1' source={BackgroundImage}/>
        {children}
    </View>
}

export default CustomLayoutHeader;