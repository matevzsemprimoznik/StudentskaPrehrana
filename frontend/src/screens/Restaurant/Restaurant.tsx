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
import {useMutation, useQuery} from "react-query";
import {CommentSend, RatingSend, ISavedMealResponse, Restaurant as IRestaurant} from "../../store/models/Restaurant";
import HttpError from "../../store/models/HttpError";
import fetch from "../../utils/fetch";
import {REST_URI} from "@env";
import post from "../../utils/post";
import {navigationRef} from "../../components/Navigation/NavigationBar";
import Loading from "../../components/Loading";


interface RestaurantProps {
}

const Restaurant: FC<RestaurantProps> = () => {
    const [commentSuccess, setCommentSuccess] = useState('');
    const [ratingSuccess, setRatingSuccess] = useState('');

    const postComment = useMutation((comment: CommentSend) => {
        return post('/restaurant/comments', comment)
    }, {
        onSuccess: () => {
            setCommentSuccess('Comment successfully sent');
            refetchRestaurant();
        }
    })

    const postRating = useMutation((rating: RatingSend) => {
        return post('/restaurant/ratings', rating)
    }, {onSuccess: () => setRatingSuccess('Rating successfully sent')})

    const {params: {restaurantID}} = useRoute<RouteProp<RootStackParamList, Routes.RESTAURANT>>();
    const {
        data: restaurant,
        isLoading: restaurantIsLoading,
        refetch: refetchRestaurant
    } = useQuery<IRestaurant, HttpError>(['restaurant', restaurantID], () => fetch('/restaurant/' + restaurantID))

    const {data: savedMeals} = useQuery<ISavedMealResponse, HttpError>(['savedMeals', restaurantID], () => fetch(`/user/savedDishes`))

    const openingHours = useMemo(() => {
        if (!restaurant) return ''
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

    const ratingRounded = useMemo(() => {
        if (restaurant && restaurant.ratings && restaurant.ratings.length) {
            const sum = restaurant.ratings.reduce((sum, rating) => sum + parseFloat(rating.rating), 0);
            const avgRating = sum / restaurant.ratings.length;
            return Math.round(avgRating);
        }
        return 5;
    }, [restaurant])

    const menu = useMemo(() => {
        if (!restaurant) return []
        return restaurant.menu.map(meal => ({
            ...meal,
            saved: savedMeals?.savedDishes.some(savedDish => savedDish.name === meal.name) || false
        }))
    }, [restaurant, savedMeals])

    const sendRating = () => {
        postRating.mutate({restaurantId: restaurantID, rating: rating}, {
            onSuccess: () => {
                refetchRestaurant()
                setIsOpenRatingModal(false)
            }
        });
    }

    const sendComment = () => {
        postComment.mutate({restaurantId: restaurantID, comment: comment}, {
            onSuccess: () => {
                setComment('');
                refetchRestaurant();
            }
        })
    }


    const openPhoneApp = async () => {
        if (restaurant?.phone) {
            const prefix = Platform.OS === 'ios' ? 'telprompt:' : 'tel:';
            await Linking.openURL(prefix + restaurant.phone);
        }
    }

    console.log(postComment.isLoading)
    if (restaurantIsLoading || !restaurant)
        return <Loading/>

    return (
        <>
            <CustomLayout>
                <CustomLayout.Header backgroundImage={{uri: `${REST_URI}/images/restaurants/${restaurant.image}`}}>
                    <View className='pb-12 pl-5 justify-end flex-1'>
                        <Text className='text-4xl text-custom-white w-5/6'>{restaurant.title}</Text>
                        <View className='flex-row items-center'
                              onTouchEnd={() => setIsOpenRatingModal(!isOpenRatingModal)}>
                            {[...Array(ratingRounded)].map((e, i) => <StarIcon color="#FEC532" size={18} key={i}/>)}
                            <Text className='text-custom-white text-xs ml-1'>({restaurant.ratings.length})</Text>
                        </View>
                    </View>
                </CustomLayout.Header>
                <CustomLayout.Main>
                    <View className='mx-2 flex-1'>
                        <View
                            className='absolute -top-10 right-8 rounded-full bg-custom-yellow flex items-center justify-center'
                            style={{width: 65, height: 65}}>
                            <Text
                                className='text-custom-white font-medium'>{`${parseFloat(restaurant.price).toFixed(2)} €`}</Text>
                        </View>
                        <View className='mb-1 mt-10 mx-2.5 flex-row justify-between'>
                            <TouchableOpacity onPress={() => setIsOpeningHoursModalOpened(true)}
                                              className='flex items-center'>
                                <ClockIcon color="#90A8D1" size={20}/>
                                <Text className='text-xs font-medium mt-2'>{openingHours}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigationRef.navigate(Routes.MAP as never, {...restaurant.coordinates} as never)}
                                className='flex items-center'>
                                <MapPinIcon color="#D69D9F" size={20}/>
                                <Text
                                    className='text-xs font-medium mt-2 text-center'>{restaurant.address.replace(',', '\n')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openPhoneApp} className='flex items-center'>
                                <PhoneIcon color="#AC89D9" size={20}/>
                                <Text
                                    className='text-xs font-medium mt-2'>{restaurant.phone || translate('restaurant-main-no-data')}</Text>
                            </TouchableOpacity>

                        </View>
                        <View className='mb-5 mt-6 mx-2.5 flex-row justify-between items-center'>
                            <Text className='text-lg font-medium '>{translate('restaurant-main-title')}</Text>
                            <TouchableOpacity onPress={() => setIsOpenCommentsModal(!isOpenCommentsModal)}
                                              className='p-1'><Text>{translate('restaurant-main-comments')}</Text>
                            </TouchableOpacity>
                        </View>
                        {menu.length !== 0 ? <ScrollView className='flex-1'>
                            <View className='flex-row justify-between flex-wrap pb-3 px-1'>
                                {menu.map((dish, index) => <Card restaurantID={restaurantID} price={restaurant.price}
                                                                 key={index} dish={dish}
                                                                 restaurantName={restaurant.title}
                                />)}</View>
                        </ScrollView> : <View className='pt-10' style={{alignItems: 'center'}}><Text
                            className='opacity-50 w-72 text-center'>{translate('restaurant-main-no-menu')}</Text></View>}

                    </View>
                </CustomLayout.Main>
            </CustomLayout>
            {isOpeningHoursModalOpened && (
                <Modal onPress={() => setIsOpeningHoursModalOpened(!isOpeningHoursModalOpened)}
                       naziv={translate('restaurant-main-opening-hours')}>
                    <View className='flex-1'>
                        {Object.entries(restaurant.openingHours).map((hours, index) => (
                            <Text key={index}
                                  className='px-3.5 py-2.5'>{translate('opening-hours-' + hours[0] as keyof typeof selectedTranslations) + ": " + hours[1]}</Text>
                        ))}
                    </View>
                </Modal>
            )}
            {isOpenCommentsModal && (
                <Modal onPress={() => setIsOpenCommentsModal(!isOpenCommentsModal)}
                       naziv={translate('restaurant-main-comments')}>
                    <ScrollView className=' mb-5 h-64'>
                        <View onStartShouldSetResponder={() => true}>
                            {restaurant.comments.length !== 0 ? restaurant.comments.map((comment, index) =>
                                    <Comment key={index} date={comment.date} comment={comment.comment}/>) :
                                <Text className='opacity-50 text-center mt-5'>{translate('no-comments')}</Text>}
                        </View>
                    </ScrollView>
                    <View className='w-full rounded-b-xl bg-custom-light-gray p-5'>
                        <View className='flex-row items-center mt-3'>
                            <TextInput className='bg-custom-white rounded-full w-3/4 p-[5px] pl-5 h-12'
                                       value={comment}
                                       placeholder={translate('comment-placeholder')}
                                       onChangeText={text => setComment(text)}/>
                            <SendButton onPress={sendComment} loading={postComment.isLoading}/>
                        </View>
                        <Text className='text-green-500 text-xs ml-2 mt-1'>{commentSuccess}</Text>
                    </View>
                </Modal>
            )}
            {isOpenRatingModal && (
                <Modal onPress={() => setIsOpenRatingModal(!isOpenRatingModal)} naziv={translate('rate-restaurant')}>
                    <View className='w-full rounded-b-xl bg-custom-light-gray p-5'>
                        <View>
                            <Text className='opacity-50 py-2 mr-3 text-lg'>{translate('rating')} {rating}</Text>
                            <View className='flex-row justify-between items-center'>
                                <View className='flex-row'>
                                    {[...Array(5)].map((_, i) =>
                                        <TouchableOpacity key={i + 1} onPress={() => setRating(i + 1)}>
                                            <StarIcon
                                                color={(i + 1) <= rating ? '#FEC532' : '#ccc'}
                                                size={35}
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <SendButton onPress={sendRating} loading={postRating.isLoading}/>
                            </View>
                        </View>
                        <Text className='text-green-500 text-xs mt-1'>{ratingSuccess}</Text>
                    </View>
                </Modal>
            )}
        </>
    );
}
export default Restaurant;