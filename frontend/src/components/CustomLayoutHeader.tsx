import {Image, View} from "react-native";
import {FC, ReactElement, ReactNode} from "react";
import BackgroundImage from '../assets/main.png'

export interface CustomLayoutHeaderProps {
    children: ReactNode
    classname?: string
}

const CustomLayoutHeader:FC<CustomLayoutHeaderProps> = ({children, classname = ''}) => {
    return <View className={`h-60 bg-custom-yellow ${classname} `}>
        <Image className='w-5/6 m-auto mt-5 absolute -z-1' source={BackgroundImage}/>
        {children}
    </View>
}

export default CustomLayoutHeader;