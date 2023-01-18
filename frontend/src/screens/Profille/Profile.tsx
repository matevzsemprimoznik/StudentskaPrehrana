import React, {FC, useEffect, useState} from 'react';
import {ScrollView, Text, View} from "react-native";
import CustomLayout from "../../components/CustomLayout";
import {UserCircleIcon} from "react-native-heroicons/outline";
import Input from "../../components/Input";
import {translate} from "../../utils/translations/translate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {User} from "../../store/models/User";
import {Formik} from "formik";
import {useMutation} from "react-query";
import patch from "../../utils/patch";
import {Errors} from "../../constants/errorConstants";
import SendButton from "../../components/SendButton";
import LogoutButton from "./LogoutButton";

interface Values {
    name: string;
    surname: string;
}

interface Error {
    name?: string;
    surname?: string;
}

const Profile:FC = () => {
    const [user, setUser] = useState<User>();
    const editUser = useMutation({mutationFn: (user: any) => {return patch(`/user/${user._id}`, {name: user.name, surname: user.surname})}});
    const [succesMessage, setSuccesMessage] = useState<string>('');
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('user');
            const user = jsonValue != null ? JSON.parse(jsonValue) : null;
            setUser(user);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData().then(() => console.log("User from async storage"));
    }, []);

    const validate = (values: Values) => {
        let errors: Error = {};
        if (!values.name) {
            errors.name = Errors.FIRST_NAME_REQUIRED;
        } else if(values.name.length < 3) {
            errors.name = Errors.FIRST_NAME_SHORT;
        }
        if (!values.surname) {
            errors.surname = Errors.LAST_NAME_REQUIRED;
        } else if(values.surname.length < 3) {
            errors.surname = Errors.LAST_NAME_SHORT;
        }
        return errors;
    }

    return (
        <CustomLayout>
            <CustomLayout.Header>
                <View className='flex-1 items-end p-3'>
                    <LogoutButton/>
                </View>
            </CustomLayout.Header>
            <CustomLayout.Main>
                <View className='flex-1 -mt-24'>
                    <View className='flex-row justify-center mt-5'>
                        <View className='bg-custom-white p-5 rounded-full shadow'>
                            <UserCircleIcon color='grey' size={80}/>
                        </View>
                    </View>
                    <View className='mx-2 flex-1 mt-6'>
                        <Text className='text-lg font-medium text-center mb-5 mx-2.5'>{translate('profile')}</Text>
                        <ScrollView className='mt-6'>
                            {user && (
                                <Formik
                                    validate={validate}
                                    initialValues={{ name: user?.name, surname: user?.surname }}
                                    onSubmit={values => editUser.mutate({
                                        _id: user?._id,
                                        name: values.name,
                                        surname: values.surname
                                    }, {
                                        onSuccess: (updatedUser) => { AsyncStorage.setItem('user', JSON.stringify(updatedUser)).then(() => setSuccesMessage(translate('edit-profile-success'))); }
                                    })}
                                >
                                    {({ handleChange, handleSubmit, values, errors }) => (
                                        <View className='mx-10'>
                                            <Text className='text-base font-medium mb-3'>{translate('edit-profile')}</Text>
                                            <Input placeholder={translate('name')} icon={'user'} classname={'px-10'} value={values.name} setValue={handleChange('name')}/>
                                            <Input placeholder={translate('surname')} icon={'user'} classname={'px-10'} value={values.surname} setValue={handleChange('surname')}/>
                                            {errors.name && <Text className='text-red-500 text-xs'>{errors.name}</Text>}
                                            {errors.surname && <Text className='text-red-500 text-xs'>{errors.surname}</Text>}
                                            <Text className='text-green-600 text-xs'>{succesMessage}</Text>
                                            <View className='flex-row justify-center mt-2'>
                                                <SendButton textClassname='text-white' buttonClassname='w-24 h-12 bg-custom-yellow rounded-full ml-3 items-center justify-center' onPress={handleSubmit} text={translate('save')}/>
                                            </View>
                                        </View>
                                    )}
                                </Formik>
                            )}

                        </ScrollView>
                    </View>
                </View>
            </CustomLayout.Main>
        </CustomLayout>
    );
};

export default Profile;