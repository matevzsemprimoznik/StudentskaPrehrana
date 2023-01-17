import {ChangeEvent, FC, useState} from 'react';
import {Pressable, Text, TextInput, View} from "react-native";
import { EnvelopeIcon } from "react-native-heroicons/outline";
import { LockClosedIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/outline";
import { UserIcon } from "react-native-heroicons/outline";
import {translate} from "../utils/translations/translate";
import {processText} from "../utils/processText";
import {useSafeAreaFrame} from "react-native-safe-area-context";

interface InputProps {
    placeholder: string;
    icon?: string;
    type?: string;
    secure?: boolean;
    classname?: string;
    value?: string | undefined;
    setValue?: (e: string | ChangeEvent<any>) => void;
}
const Input:FC<InputProps> = ({placeholder, icon, classname, secure, value, setValue}) => {
    const [secureTextEntry, setSecureTextEntry] = useState(secure);

    const frame = useSafeAreaFrame()
    console.log(frame)

    return (
        <View className='mb-5'>
            <View className='absolute ml-3 z-10 flex-row h-full items-center justify-center'>
                {icon === 'user' && <UserIcon color={'grey'} size={20}/>}
                {icon === 'envelope' && <EnvelopeIcon color={'grey'} size={20}/>}
                {icon === 'lock' && <LockClosedIcon color={'grey'} size={20}/>}
                {icon === 'map' && <MapPinIcon color={'grey'} size={20}/>}
            </View>
            <TextInput
                className={`bg-custom-white w-full py-3 rounded shadow-md px-10 ${classname}`}
                placeholder={processText(placeholder)}
                autoCorrect={false}
                autoCapitalize={'none'}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={setValue}
            />
            {secure && (
                <View className='absolute top-3 z-10 ml-72'>
                    <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)}>
                        <Text className='text-xs opacity-50'>{secureTextEntry ? translate('show-password') : translate('hide-password')}</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default Input;