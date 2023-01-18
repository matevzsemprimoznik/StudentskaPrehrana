import Toast from 'react-native-root-toast';
import {ReactElement} from "react";

interface ToastInstance {
    key: string,
    element: ReactElement,
}

let instance: ToastInstance | null = null

export const showToast = (message: string) => {
    if (instance != null) {
        if (instance.key !== message) {
            Toast.hide(instance.element)
            instance = null
            instance = {
                key: message,
                element: Toast.show(message, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                })
            }
        }
    } else {
        instance = {
            key: message,
            element: Toast.show(message, {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            })
        }
    }
}