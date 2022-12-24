import {View} from "react-native";
import {FC, ReactNode} from "react";

export interface CustomLayoutMainProps {
    children: ReactNode
    classname?: string
}

const CustomLayoutMain:FC<CustomLayoutMainProps> = ({children,classname = ''}) => {
    return (
        <View className={`-mt-8 rounded-t-[30px] flex-1 bg-custom-light-gray ${classname}`}>{children}</View>
    )
}

export default CustomLayoutMain;