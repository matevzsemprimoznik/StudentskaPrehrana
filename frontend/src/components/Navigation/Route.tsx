import React, {FC, ReactNode, useRef} from "react";
import {useSafeAreaFrame, useSafeAreaInsets} from "react-native-safe-area-context";
import {View} from "react-native";
import NavigationBar from "./NavigationBar";

interface RouteProps {
    children: ReactNode
    showNavigationBar?: boolean
}

const Route:FC<RouteProps> = ({children, showNavigationBar = false}) => {
    const frame = useSafeAreaFrame()
    const insets = useSafeAreaInsets();
    const initialFrame = useRef(frame)
    const style = showNavigationBar ?
        {height: initialFrame.current.height - insets.top - insets.bottom - 60, marginTop: insets.top} : {height: initialFrame.current.height - insets.top - insets.bottom, marginTop: insets.top}

    return <View className='flex-1'>
        <View className='absolute top-0 left-0 right-0 -z-50 bg-custom-yellow' style={{height: insets.top}}/>
        <View style={style}>
            {children}
        </View>
    </View>
}
export default Route