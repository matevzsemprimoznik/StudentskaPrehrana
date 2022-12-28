import React, {FC, ReactElement, ReactNode, useRef} from "react";
import {SafeAreaView, useSafeAreaFrame, useSafeAreaInsets} from "react-native-safe-area-context";
import {View} from "react-native";
import CustomLayoutHeader, {CustomLayoutHeaderProps} from "./CustomLayoutHeader";
import CustomLayoutMain, {CustomLayoutMainProps} from "./CustomLayoutMain";
import NavigationBar from "./Navigation/NavigationBar";

let children: [ReactElement<CustomLayoutHeaderProps>, ReactElement<CustomLayoutMainProps>]

interface MainLayoutProps {
    children: typeof children;
}

type TableSubComponents = {
    Header: typeof CustomLayoutHeader;
    Main: typeof CustomLayoutMain;
}

const CustomLayout:FC<MainLayoutProps> & TableSubComponents = ({ children }) => {
    const frame = useSafeAreaFrame()
    const insets = useSafeAreaInsets();
    const initialFrame = useRef(frame)

    return <View className='flex-1'>
            <View className='h-20 absolute top-0 left-0 right-0 -z-20 bg-custom-yellow'/>
            <View style={{height: initialFrame.current.height - insets.top - insets.bottom, marginTop: insets.top}}>
                <View className='flex-col flex-1'>
                    {children}
                </View>
                <NavigationBar/>
            </View>
        </View>
}

CustomLayout.Main = CustomLayoutMain;
CustomLayout.Header = CustomLayoutHeader;

export default CustomLayout;