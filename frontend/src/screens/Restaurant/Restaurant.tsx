import {View, Text, ScrollView, TextInput, TouchableOpacity, Linking, Platform} from "react-native";
import {FC, useMemo, useState} from "react";
import CustomLayout from "../../components/CustomLayout";
import {selectedTranslations, translate} from "../../utils/translations/translate";
import Card from "./Card";
import {PhoneIcon, MapPinIcon, ClockIcon} from "react-native-heroicons/solid";
import {StarIcon} from "react-native-heroicons/solid";
import Comment from "../../components/Comment";
import Modal from "../../components/Modal";
import SendButton from "../../components/SendButton";
import {RouteProp, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../../components/Navigation/Router";
import {Routes} from "../../../routes";
import {useQuery} from "react-query";
import {Restaurant as IRestaurant} from "../../store/models/Restaurant";
import HttpError from "../../store/models/HttpError";
import fetch from "../../utils/fetch";
import {REST_URI} from "@env";


interface RestaurantProps {}

const Restaurant: FC<RestaurantProps> = () => {
    const {params: {restaurantID}} = useRoute<RouteProp<RootStackParamList, Routes.RESTAURANT>>();
    const {data: restaurant, isLoading} = useQuery<IRestaurant, HttpError>('restaurant', () => fetch('/restaurant/' + restaurantID))
    const openingHours = useMemo(() => {
        if(!restaurant) return ''
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const today = new Date();
        const todayName = days[today.getDay()];
        return restaurant.openingHours[todayName as keyof typeof restaurant.openingHours]
    }, [restaurant])
    const [isOpenCommentsModal, setIsOpenCommentsModal] = useState(false);
    const [isOpenRatingModal, setIsOpenRatingModal] = useState(false);
    const [isOpeningHoursModalOpened, setIsOpeningHoursModalOpened] = useState(false);

    const [rating, setRating] = useState(3);
    const [comment, setComment] = useState("");


    const sendRating = () => {
        setIsOpenRatingModal(false);
        //send "rating"
    }

    const sendComment = () => {
        setIsOpenCommentsModal(false);
        //send "comment"
        setComment("")

    }

    if(isLoading || !restaurant) return <View><Text>Loading...</Text></View>

    const openPhoneApp = async () => {
        if(restaurant.phone){
            const prefix = Platform.OS === 'ios' ? 'telprompt:' : 'tel:';
            await Linking.openURL(prefix + restaurant.phone);
        }
    }

    return (
        <>
            <CustomLayout>
                <CustomLayout.Header backgroundImage={{uri: `${REST_URI}/images/${restaurant.image}`}}>
                    <View className='pb-12 pl-5 justify-end flex-1'>
                        <Text className='text-4xl text-custom-white w-5/6'>{restaurant.title}</Text>
                        <View className='flex-row items-center' onTouchEnd={() => setIsOpenRatingModal(!isOpenRatingModal)}>
                            <StarIcon color="#FEC532" size={18}/>
                            <StarIcon color="#FEC532" size={18}/>
                            <StarIcon color="#FEC532" size={18}/>
                            <StarIcon color="#FEC532" size={18}/>
                            <Text className='text-custom-white text-xs ml-1'>({restaurant.numberOfReviews})</Text>
                        </View>
                    </View>
                </CustomLayout.Header>
                <CustomLayout.Main>
                    <View className='mx-2 flex-1'>
                        <View
                            className='absolute -top-10 right-8 rounded-full bg-custom-yellow flex items-center justify-center' style={{width: 70, height: 70}}>
                            <Text
                                className='text-lg text-custom-white font-medium shadow'>{`${parseFloat(restaurant.price).toFixed(2)} €`}</Text>
                        </View>
                        <View className='mb-1 mt-10 mx-2.5 flex-row justify-between'>
                            <TouchableOpacity onPress={() => setIsOpeningHoursModalOpened(true)} className='flex items-center'>
                                <ClockIcon color="#90A8D1" size={20}/>
                                <Text className='text-xs font-medium mt-2'>{openingHours}</Text>
                            </TouchableOpacity>
                            <View className='flex items-center'>
                                <MapPinIcon color="#D69D9F" size={20}/>
                                <Text className='text-xs font-medium mt-2 text-center'>{restaurant.address.replace(',', '\n')}</Text>
                            </View>
                            <TouchableOpacity onPress={openPhoneApp} className='flex items-center'>
                                <PhoneIcon color="#AC89D9" size={20}/>
                                <Text
                                    className='text-xs font-medium mt-2'>{restaurant.phone || translate('restaurant-main-no-data')}</Text>
                            </TouchableOpacity>

                        </View>
                        <View className='mb-5 mt-6 mx-2.5 flex-row justify-between items-center'>
                            <Text className='text-lg font-medium '>{translate('restaurant-main-title')}</Text>
                            <Text onPress={() => setIsOpenCommentsModal(!isOpenCommentsModal)}>{translate('restaurant-main-comments')}</Text>
                        </View>
                        {restaurant.menu.length !== 0 ? <ScrollView className='flex-1'>
                            <View className='flex-row justify-between flex-wrap pb-3 px-1'>
                                {restaurant.menu.map((dish, index) => <Card key={index} dish={dish} price={restaurant.price}/>)}
                            </View>
                        </ScrollView> : <View className='pt-10' style={{alignItems: 'center'}}><Text className='opacity-50 w-72 text-center'>{translate('restaurant-main-no-menu')}</Text></View>}

                    </View>
                </CustomLayout.Main>
            </CustomLayout>
            {isOpeningHoursModalOpened && (
                <Modal onPress={() => setIsOpeningHoursModalOpened(!isOpeningHoursModalOpened)} naziv={translate('restaurant-main-opening-hours')}>
                    <View className='flex-1'>
                        {Object.entries(restaurant.openingHours).map((hours, index) => (
                            <Text className='px-3.5 py-2.5'>{translate('opening-hours-' + hours[0] as keyof typeof selectedTranslations) + ": " + hours[1]}</Text>
                        ))}
                    </View>
                </Modal>
            )}
            {isOpenCommentsModal && (
                <Modal onPress={() => setIsOpenCommentsModal(!isOpenCommentsModal)} naziv={translate('restaurant-main-comments')}>
                    <ScrollView className=' mb-5 h-64'><View onStartShouldSetResponder={() => true}>
                        {restaurant.comments ? restaurant.comments.map((comment, index) => <Comment key={index}
                                                                                          date={comment.date}
                                                                                          comment={comment.comment}/>) :
                            <Text className='opacity-50'>{translate('no-comments')}</Text>}
                    </View>
                    </ScrollView>
                    <View className='w-full rounded-b-xl bg-custom-light-gray p-5'>
                        <View className='flex-row items-center mt-3'>
                            <TextInput className='bg-custom-white rounded-full w-3/4 p-[5px] pl-5 h-12'
                                       placeholder={translate('comment-placeholder')}
                                       onChangeText={text => setComment(text)}/>
                            <SendButton onPress={sendComment} />
                        </View>
                    </View>
                </Modal>
            )}
            {isOpenRatingModal && (
            <Modal onPress={() => setIsOpenRatingModal(!isOpenRatingModal)} naziv={translate('rate-restaurant')}>
                <View className='w-full rounded-b-xl bg-custom-light-gray p-5'>
                    <View className='flex-row items-center space-between'>
                        <Text className='opacity-50 py-2 mr-3 text-lg'>{translate('rating')} {rating}</Text>
                        {[...Array(5)].map((_, i) => {
                            const ratingValue = i + 1;
                            return (
                                <TouchableOpacity key={ratingValue} onPress={() => setRating(ratingValue)}>
                                    <StarIcon
                                        color={ratingValue <= rating ? '#FEC532' : '#ccc'}
                                        size={35}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                        <SendButton onPress={sendRating} />
                    </View>
                </View>
            </Modal>
            )}
        </>
    );
}
export default Restaurant;