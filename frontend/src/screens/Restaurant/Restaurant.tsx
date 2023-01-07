import {View, Text, ScrollView, TextInput, TouchableOpacity} from "react-native";
import {FC, useState} from "react";
import CustomLayout from "../../components/CustomLayout";
import {translate} from "../../utils/translations/translate";
import Card from "./Card";
import {PhoneIcon, MapPinIcon, ClockIcon} from "react-native-heroicons/solid";
import {StarIcon} from "react-native-heroicons/solid";
import Comment from "../../components/Comment";
import Modal from "../../components/Modal";
import SendButton from "../../components/SendButton";


interface RestaurantProps {}

const Restaurant: FC<RestaurantProps> = () => {

    const [isOpenCommentsModal, setIsOpenCommentsModal] = useState(false);
    const [isOpenRatingModal, setIsOpenRatingModal] = useState(false);

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



    const restaurant = {
        name: "Ancora",
        location: "Jurčičeva ulica 7, Maribor",
        openingHours: "10:00 - 21:00",
        rating: 4.8,
        numberOfReviews: 230,
        price: 3.60,
        phone: "040 452 241"
    }

    const dishesList = [
        {
            name: 'Kmečka pica',
            description: 'Kmečka pica s salamo in papriko iz krušne peči.',
            rating: 4.8,
            numberOfReviews: 230,
            image: require('../../assets/pizza.png')
        }, {
            name: 'Kmečka pica',
            description: 'Kmečka pica s salamo in papriko iz krušne peči.',
            rating: 4.8,
            numberOfReviews: 230,
            image: require('../../assets/pizza.png')
        }, {
            name: 'Kmečka pica',
            description: 'Kmečka pica s salamo in papriko iz krušne peči.',
            rating: 4.8,
            numberOfReviews: 230,
            image: require('../../assets/pizza.png')
        }
        , {
            name: 'Kmečka pica',
            description: 'Kmečka pica s salamo in papriko iz krušne peči.',
            rating: 4.8,
            numberOfReviews: 230,
            image: require('../../assets/pizza.png')
        }
        , {
            name: 'Kmečka pica',
            description: 'Kmečka pica s salamo in papriko iz krušne peči.',
            rating: 4.8,
            numberOfReviews: 230,
            image: require('../../assets/pizza.png')
        }
        , {
            name: 'Kmečka pica',
            description: 'Kmečka pica s salamo in papriko iz krušne peči.',
            rating: 4.8,
            numberOfReviews: 230,
            image: require('../../assets/pizza.png')
        }
    ]

    const comments = [
        {
            date: '1.12.2022',
            comment: 'Pizza was great, but the delivery was late.'
        },
        {
            date: '1.1.2022',
            comment: 'Pizza was delicious and would order again.'
        },
        {
            date: '13.12.2021',
            comment: 'Fine, but not the best pizza I have ever had.'
        },
        {
            date: '1.12.2022',
            comment: 'Pizza was great, but the delivery was late.'
        },
        {
            date: '1.1.2022',
            comment: 'Pizza was delicious and would order again.'
        },
        {
            date: '13.12.2021',
            comment: 'Fine, but not the best pizza I have ever had.'
        }
    ]

    return (
        <>
            <CustomLayout>
                <CustomLayout.Header backgroundImage={require('../../assets/ancora-large.png')}>
                    <View className='ml-10 mt-28'>
                        <Text className='text-5xl text-custom-white'>{restaurant.name}</Text>
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
                            className='absolute -top-14 right-8 rounded-full bg-custom-yellow h-20 w-20 flex items-center justify-center'>
                            <Text
                                className='text-lg text-custom-white font-medium shadow'>{`${restaurant.price.toFixed(2)}€`}</Text>
                        </View>
                        <View className='mb-1 mt-10 mx-2.5 flex-row justify-between items-center '>
                            <View className='flex items-center'>
                                <ClockIcon color="#90A8D1" size={20}/>
                                <Text className='text-xs font-medium mt-2'>{restaurant.openingHours}</Text>
                            </View>
                            <View className='flex items-center'>
                                <MapPinIcon color="#D69D9F" size={20}/>
                                <Text className='text-xs font-medium mt-2'>{restaurant.location}</Text>
                            </View>
                            <View className='flex items-center'>
                                <PhoneIcon color="#AC89D9" size={20}/>
                                <Text
                                    className='text-xs font-medium mt-2'>{restaurant.phone}</Text>
                            </View>

                        </View>
                        <View className='mb-5 mt-6 mx-2.5 flex-row justify-between items-center'>
                            <Text className='text-lg font-medium '>{translate('restaurant-main-title')}</Text>
                            <Text onPress={() => setIsOpenCommentsModal(!isOpenCommentsModal)}>{translate('restaurant-main-comments')}</Text>
                        </View>
                        <ScrollView className='flex-1'>
                            <View className='flex-row justify-between flex-wrap pb-3 px-1'>
                                {dishesList.map((dish, index) => <Card key={index} dish={dish}/>)}
                            </View>
                        </ScrollView>

                    </View>
                </CustomLayout.Main>
            </CustomLayout>
            {isOpenCommentsModal && (
                <Modal onPress={() => setIsOpenCommentsModal(!isOpenCommentsModal)} naziv={translate('restaurant-main-comments')}>
                    <ScrollView className=' mb-5 h-64'><View onStartShouldSetResponder={() => true}>
                        {comments.length ? comments.map((comment, index) => <Comment key={index}
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