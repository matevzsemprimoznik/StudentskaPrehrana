import {Image, View} from "react-native";
import {FC, ReactElement, ReactNode} from "react";
import BackgroundImage from '../assets/main.png'

export interface CustomLayoutHeaderProps {
    children: ReactNode
    classname?: string
}

const CustomLayoutHeader:FC<CustomLayoutHeaderProps> = ({children, classname = ''}) => {
    return <View className={`h-60 w-full bg-custom-yellow ${classname}`}>
        <Image className='flex-1 mt-5 mx-2 ml-3 absolute -z-1' source={BackgroundImage}/>
        {children}
    </View>
}

export default CustomLayoutHeader;