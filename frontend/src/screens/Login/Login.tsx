import React, {FC} from 'react';
import {Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Link} from "@react-navigation/native";
import {translate} from "../../utils/translations/translate";

const Login:FC = () => {
    return (
        <View className='h-full'>
            <SafeAreaView className='flex-1 justify-center items-center mx-2'>
                <View className='mb-3 right-20'>
                    <Text className='text-3xl font-bold mb-1'>{translate('sign-in')}</Text>
                    <Text>{translate('plese-sign-in')}</Text>
                </View>
                <View className='w-4/5'>
                    <Input placeholder={'email'} icon={'envelope'} classname={'px-10'}/>
                    <Input placeholder={translate('password')} icon={'lock'} classname={'px-10'} secure={true}/>
                </View>
                <View className='left-1/4 mt-1 shadow-md rounded-full bg-custom-yellow px-9 py-3'>
                    <Button onPress={() => alert('Login happens')} classname={'bold text-custom-white'} text={translate('sign-in')}/>
                </View>
                <View className='absolute bottom-10 flex-row space-x-1'>
                    <Text>{translate('no-account-yet')}</Text>
                    <Link to={{ screen: 'Register' }}>
                        <Text className='text-custom-yellow bold'>{translate('no-account')}</Text>
                    </Link>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default Login;