import React, {FC, ReactElement, ReactNode} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {View} from "react-native";
import CustomLayoutHeader, {CustomLayoutHeaderProps} from "./CustomLayoutHeader";
import CustomLayoutMain, {CustomLayoutMainProps} from "./CustomLayoutMain";

let children: [ReactElement<CustomLayoutHeaderProps>, ReactElement<CustomLayoutMainProps>]

interface MainLayoutProps {
    children: typeof children;
}

type TableSubComponents = {
    Header: typeof CustomLayoutHeader;
    Main: typeof CustomLayoutMain;
}

const CustomLayout:FC<MainLayoutProps> & TableSubComponents = ({ children }) => {
        return <View className='flex-1'>
            <View className='h-20 absolute top-0 left-0 right-0 -z-20  bg-custom-yellow'/>
            <SafeAreaView>
                <View className='flex-col h-full'>
                    {children}
                </View>
            </SafeAreaView>
        </View>
}

CustomLayout.Main = CustomLayoutMain;
CustomLayout.Header = CustomLayoutHeader;

export default CustomLayout;