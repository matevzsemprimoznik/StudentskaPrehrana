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

const CustomLayout: FC<MainLayoutProps> & TableSubComponents = ({children}) => {

    return <View className='flex-col flex-1'>
        {children}
    </View>

}

CustomLayout.Main = CustomLayoutMain;
CustomLayout.Header = CustomLayoutHeader;

export default CustomLayout;