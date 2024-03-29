import React, {FC, useState} from 'react';
import {Pressable, Text, View} from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {translate} from "../../utils/translations/translate";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../config/firebase";
import {Formik} from "formik";
import {navigationRef} from "../../components/Navigation/NavigationBar";
import {Routes} from "../../../routes";
import {Errors, FirebaseErrors} from "../../constants/errorConstants";
import fetch from "../../utils/fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Values {
    email: string;
    password: string;
}

interface Error {
    email?: string;
    password?: string;
}
const Login:FC = () => {
    const [error, setError] = useState('');

    const login = async (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                // const user = await getUserDetails(userCredential.user.uid)
                const user = await fetch(`/user/${userCredential.user.uid}`);
                console.log(user);
                if (user) {
                    AsyncStorage.setItem('user', JSON.stringify(user));
                    navigationRef.navigate(Routes.HOME as never);
                } else {
                    setError('Please try again later.');
                }
            })
            .catch(err=> {
                if (
                    err.code === FirebaseErrors.WRONG_PASSWORD ||
                    FirebaseErrors.USER_NOT_FOUND ||
                    FirebaseErrors.WRONG_EMAIL
                ) {
                    setError(Errors.WRONG_CREDENTIALS);
                    return;
                }
            });
    }

    const validate = (values: Values) => {
        let errors: Error = {};
        if (!values.email) {
            errors.email = Errors.EMAIL_REQUIRED;
        } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = Errors.INVALID_EMAIL;
        }
        if (!values.password) {
            errors.password = Errors.PASSWORD_REQUIRED;
        } else if(values.password.length < 6) {
            errors.password = Errors.SHORT_PASSWORD;
        }
        return errors;
    }

    return (
        <View className='h-full'>
            <View className='h-full flex-1 justify-center items-center mx-2'>
                <Formik
                    validate={validate}
                    initialValues={ {email: '', password: ''} }
                    onSubmit={values => login(values.email, values.password)}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <>
                            <View className='mb-3 right-20'>
                                <Text className='text-3xl font-bold mb-1'>{translate('sign-in')}</Text>
                                <Text>{translate('plese-sign-in')}</Text>
                                {error && <Text className='text-red-500 text-xs'>{error}</Text>}
                            </View>
                            <View className='w-4/5'>
                                <Input placeholder={'email'} icon={'envelope'} classname={'px-10'} value={values.email} setValue={handleChange('email')}/>
                                <Input placeholder={translate('password')} icon={'lock'} classname={'px-10'} secure={true} value={values.password} setValue={handleChange('password')}/>
                                {errors.email && <Text className='text-red-500 text-xs'>{errors.email}</Text>}
                                {errors.password && <Text className='text-red-500 text-xs'>{errors.password}</Text>}
                            </View>
                            <View className='left-1/4 mt-1 shadow-md rounded-full bg-custom-yellow px-9 py-3'>
                                <Button onPress={handleSubmit} classname={'bold text-custom-white'} text={translate('sign-in')}/>
                            </View>
                        </>
                        )}
                </Formik>
                <View className='absolute bottom-10 flex-row space-x-1'>
                    <Text>{translate('no-account-yet')}</Text>
                    <Pressable onPress={() => navigationRef.navigate(Routes.REGISTER as never)}>
                        <Text className='text-custom-yellow bold'>{translate('no-account')}</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default Login;