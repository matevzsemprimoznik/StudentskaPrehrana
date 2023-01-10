import React, { FC } from 'react';
import {Pressable, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {translate} from "../../utils/translations/translate";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../config/firebase";
import {Formik} from 'formik';
import {Routes} from "../../../routes";
import {navigationRef} from "../../components/Navigation/NavigationBar";
import {Errors} from "../../constants/errorConstants";
import {useMutation} from "react-query";
import {User} from "../../store/models/User";
import axios from "axios";

interface Values {
    name: string;
    surname: string;
    email: string;
    password: string;
    confirm_password: string;
}
interface Error {
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
}

const Register:FC = () => {
    const addUser = useMutation({mutationFn: (user: User) => {return axios.post('/user/', user)}})
    const register = async (data:any) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(userCredential => {
                // Signed in
                const firebaseUser = userCredential.user;
                //an endpoint is called to save user to mongodb
                addUser.mutate({
                        name: data.name,
                        surname: data.surname,
                        email: data.email,
                        uid: firebaseUser.uid
                    },
                    {onSuccess: () => {console.log('User added to mongo.')}
                    })
                //redirect user to login
                navigationRef.navigate(Routes.LOGIN as never);
            })
            .catch(err=> {
                console.log(err.code, err.message);
            });
    }

    const validate = (values: Values) => {
        let errors: Error = {};
        if (!values.email) {
            errors.email = Errors.EMAIL_REQUIRED;
        } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = Errors.INVALID_EMAIL;
        }
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
        if (values.password !== values.confirm_password) {
            errors.confirm_password = Errors.PASSWORDS_DONT_MATCH;
        } else if (values.password.length < 6) {
            errors.password = Errors.SHORT_PASSWORD;
        }
        return errors;
    }

    return (
        <View className='h-full'>
            <SafeAreaView className='flex-1 justify-center items-center mx-2'>
                <Formik
                    validate={validate}
                    initialValues={ {name: '', surname: '', email: '', password: '', confirm_password: ''} }
                    onSubmit={values => register(values)}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <>
                            <View className='mb-3 right-20'>
                                <Text className='text-3xl font-bold mb-1'>{translate('register')}</Text>
                                <Text>{translate('enter-credentials')}</Text>
                            </View>
                            <View className='w-4/5'>
                                <Input placeholder={'Ime'} icon={'user'} classname={'px-10'} value={values.name} setValue={handleChange('name')}/>
                                <Input placeholder={'Priimek'} icon={'user'} classname={'px-10'} value={values.surname} setValue={handleChange('surname')}/>
                                <Input placeholder={'email'} icon={'envelope'} classname={'px-10'} value={values.email} setValue={handleChange('email')}/>
                                <Input placeholder={translate('password')} icon={'lock'} classname={'px-10'} secure={true} value={values.password} setValue={handleChange('password')}/>
                                <Input placeholder={translate('repeat-password')} icon={'lock'} classname={'px-10'} secure={true} value={values.confirm_password} setValue={handleChange('confirm_password')}/>
                                {errors.name && <Text className='text-custom-red text-xs'>{errors.name}</Text>}
                                {errors.surname && <Text className='text-custom-red text-xs'>{errors.surname}</Text>}
                                {errors.email && <Text className='text-custom-red text-xs'>{errors.email}</Text>}
                                {errors.password && <Text className='text-custom-red text-xs'>{errors.password}</Text>}
                                {errors.confirm_password && <Text className='text-custom-red text-xs'>{errors.confirm_password}</Text>}
                            </View>
                            <View className='left-1/4 mt-1 shadow-md rounded-full bg-custom-yellow px-6 py-3'>
                                <Button onPress={handleSubmit} classname={'bold text-custom-white'} text={translate('register')}/>
                            </View>
                        </>
                        )}
                </Formik>

                <View className='absolute bottom-10 flex-row space-x-1'>
                    <Text>{translate('continue-without-account')}</Text>
                    <Pressable onPress={() => navigationRef.navigate(Routes.HOME as never)}>
                        <Text className='text-custom-yellow bold'>{translate('continue')}</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default Register;