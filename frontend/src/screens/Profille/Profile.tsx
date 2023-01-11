import {FC} from 'react';
import {ScrollView, Text, View} from "react-native";
import CustomLayout from "../../components/CustomLayout";
import {UserCircleIcon} from "react-native-heroicons/outline";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {translate} from "../../utils/translations/translate";

const Profile:FC = () => {

    return (
        <CustomLayout>
            <CustomLayout.Header>
                <View/>
            </CustomLayout.Header>
            <CustomLayout.Main>
                <View className='flex-1 -mt-24'>
                    <View className='flex-row justify-center mt-5'>
                        <View className='bg-custom-white p-5 rounded-full shadow'>
                            <UserCircleIcon color='black' size={80}/>
                        </View>
                    </View>
                    <View className='mx-2 flex-1 mt-6'>
                        <Text className='text-lg font-medium text-center mb-5 mx-2.5'>{translate('profile')}</Text>
                        <ScrollView className='mt-6'>
                            <View className='mx-10'>
                                <Text className='text-base font-medium mb-3'>{translate('edit-profile')}</Text>
                                <Input placeholder={translate('name')} icon={'user'} classname={'px-10'}/>
                                <Input placeholder={translate('surname')} icon={'user'} classname={'px-10'}/>
                                <Input placeholder={translate('location')} icon={'map'} classname={'px-10'}/>
                                <View className='shadow-md rounded-full bg-custom-yellow p-3 mx-20 mt-6'>
                                    <Button text={'Save'} onPress={() => alert('Save happens')} classname={'bold text-custom-white text-center'}/>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </CustomLayout.Main>
        </CustomLayout>
    );
};

export default Profile;