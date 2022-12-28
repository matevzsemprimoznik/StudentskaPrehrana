import {FC, useState} from 'react';
import {Pressable, Text, TextInput, View} from "react-native";
import { EnvelopeIcon } from "react-native-heroicons/outline";
import { LockClosedIcon } from "react-native-heroicons/outline";
import { UserIcon } from "react-native-heroicons/outline";
import {translate} from "../utils/translations/translate";

interface InputProps {
    placeholder: string;
    icon?: string;
    type?: string;
    secure?: boolean;
    classname?: string;
}
const Input:FC<InputProps> = ({placeholder, icon, classname, secure}) => {
    const [value, setValue] = useState<string>('');
    const [secureTextEntry, setSecureTextEntry] = useState(secure);

    return (
        <View className='mb-5'>
            <View className='absolute top-2.5 ml-2 z-10'>
                {icon === 'user' && <UserIcon color={'grey'} size={20}/>}
                {icon === 'envelope' && <EnvelopeIcon color={'grey'} size={20}/>}
                {icon === 'lock' && <LockClosedIcon color={'grey'} size={20}/>}
            </View>
            <TextInput
                className={`bg-custom-white w-full py-3 rounded shadow-md px-2 ${classname}`}
                placeholder={placeholder}
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