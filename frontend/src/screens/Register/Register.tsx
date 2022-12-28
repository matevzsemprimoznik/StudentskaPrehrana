import { FC } from 'react';
import {Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {translate} from "../../utils/translations/translate";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Link} from "@react-navigation/native";

const Register:FC = () => {
    return (
        <View className='h-full'>
            <SafeAreaView className='flex-1 justify-center items-center mx-2'>
                <View className='mb-3 right-20'>
                    <Text className='text-3xl font-bold mb-1'>{translate('register')}</Text>
                    <Text>{translate('enter-credentials')}</Text>
                </View>
                <View className='w-4/5'>
                    <Input placeholder={'Ime'} icon={'user'} classname={'px-10'}/>
                    <Input placeholder={'Priimek'} icon={'user'} classname={'px-10'}/>
                    <Input placeholder={'email'} icon={'envelope'} classname={'px-10'}/>
                    <Input placeholder={translate('password')} icon={'lock'} classname={'px-10'} secure={true}/>
                    <Input placeholder={translate('repeat-password')} icon={'lock'} classname={'px-10'} secure={true}/>
                </View>
                <View className='left-1/4 mt-1 shadow-md rounded-full bg-custom-yellow px-6 py-3'>
                    <Button onPress={() => alert('Login happens')} classname={'bold text-custom-white'} text={translate('register')}/>
                </View>
                <View className='absolute bottom-10 flex-row space-x-1'>
                    <Text>{translate('continue-without-account')}</Text>
                    <Link to={{ screen: 'Home' }}>
                        <Text className='text-custom-yellow bold'>{translate('continue')}</Text>
                    </Link>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default Register;