import React, {FC, useState} from 'react';
import {Pressable, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {translate} from "../../utils/translations/translate";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../config/firebase";
import {Formik} from 'formik';
import {Routes} from "../../../routes";
import {navigationRef} from "../../components/Navigation/NavigationBar";
import {Errors, FirebaseErrors} from "../../constants/errorConstants";
import {useMutation} from "react-query";
import {User} from "../../store/models/User";
import post from "../../utils/post";
import SendButton from "../../components/SendButton";

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

const Register: FC = () => {
    const addUser = useMutation({
        mutationFn: (user: User) => {
            return post('/user/', user)
        }
    });
    const [error, setError] = useState('');
    const register = async (data: Values) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(userCredential => {
                const firebaseUser = userCredential.user;
                addUser.mutate({
                        name: data.name,
                        surname: data.surname,
                        email: data.email,
                        uid: firebaseUser.uid
                    },
                    {
                        onSuccess: () => {
                            navigationRef.navigate(Routes.LOGIN as never)
                        },
                        onError: () => {
                            setError('Something went wrong, please try again later.')
                        }
                    });
            })
            .catch(err => {
                if (err.code === FirebaseErrors.SHORT_PASSWORD) {
                    setError(Errors.SHORT_PASSWORD);
                    return;
                }
                if (err.code === FirebaseErrors.EMAIL_TAKE) {
                    setError(Errors.EMAIL_TAKE);
                    return;
                }
                if (err.code === FirebaseErrors.INVALID_MAIL) {
                    setError(Errors.INVALID_EMAIL);
                    return;
                }
            });
    }

    const validate = (values: Values) => {
        let errors: Error = {};
        if (!values.email) {
            errors.email = Errors.EMAIL_REQUIRED;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = Errors.INVALID_EMAIL;
        }
        if (!values.name) {
            errors.name = Errors.FIRST_NAME_REQUIRED;
        } else if (values.name.length < 3) {
            errors.name = Errors.FIRST_NAME_SHORT;
        }
        if (!values.surname) {
            errors.surname = Errors.LAST_NAME_REQUIRED;
        } else if (values.surname.length < 3) {
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
        <View className='flex-1'>
            <View className='flex-1 mx-2 justify-center items-center'>
                <Formik
                    validate={validate}
                    initialValues={{name: '', surname: '', email: '', password: '', confirm_password: ''}}
                    onSubmit={values => register(values)}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({handleChange, handleSubmit, values, errors}) => (
                        <View className='w-5/6'>
                            <View className='mb-6'>
                                <Text className='text-3xl font-bold mb-1'>{translate('register')}</Text>
                                <Text>{translate('enter-credentials')}</Text>
                                {error && <Text className='text-red-500 text-xs'>{error}</Text>}
                            </View>
                            <View>
                                <Input placeholder={'Ime'} icon={'user'} classname={'px-10'} value={values.name}
                                       setValue={handleChange('name')}/>
                                <Input placeholder={'Priimek'} icon={'user'} classname={'px-10'} value={values.surname}
                                       setValue={handleChange('surname')}/>
                                <Input placeholder={'email'} icon={'envelope'} classname={'px-10'} value={values.email}
                                       setValue={handleChange('email')}/>
                                <Input placeholder={translate('password')} icon={'lock'} classname={'px-10'}
                                       secure={true} value={values.password} setValue={handleChange('password')}/>
                                <Input placeholder={translate('repeat-password')} icon={'lock'} classname={'px-10'}
                                       secure={true} value={values.confirm_password}
                                       setValue={handleChange('confirm_password')}/>
                                {errors.name && <Text className='text-red-500 text-xs'>{errors.name}</Text>}
                                {errors.surname && <Text className='text-red-500 text-xs'>{errors.surname}</Text>}
                                {errors.email && <Text className='text-red-500 text-xs'>{errors.email}</Text>}
                                {errors.password && <Text className='text-red-500 text-xs'>{errors.password}</Text>}
                                {errors.confirm_password &&
                                    <Text className='text-red-500 text-xs'>{errors.confirm_password}</Text>}
                            </View>
                            <View className='flex-row justify-end mt-2'>
                                <SendButton textClassname='text-white bold' buttonClassname='w-32 h-12 bg-custom-yellow rounded-full ml-3 items-center justify-center' onPress={handleSubmit} text={translate('register')}/>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
            <View className='flex-row h-16 justify-center'>
                <Text>{translate('continue-without-account') + " "}</Text>
                <Pressable onPress={() => navigationRef.navigate(Routes.HOME as never)}>
                    <Text className='text-custom-yellow bold'>{translate('continue')}</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Register;