import {FC, useState} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {translate} from "../../utils/translations/translate";
import CustomLayout from "../../components/CustomLayout";
import FoodImageCircle from "./FoodImageCircle";
import Rating from "../../components/Rating";
import Price from "../../components/Price";
import ListItem from "../../components/ListItem";
import ImageList from "./ImageList";
import Comment from "../../components/Comment";
import Heart from "../../components/Heart";
import ImageUpload from "../../components/ImageUpload";
import {StarIcon} from "react-native-heroicons/solid";
import Modal from "../../components/Modal";
import {RouteProp, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../../components/Navigation/Router";
import {Routes} from "../../../routes";
import {processText} from "../../utils/processText";
import Button from "../../components/Button";
import {useMutation} from "react-query";
import {CommentDishSend, RatingDishSend} from "../../store/models/Restaurant";
import post from "../../utils/post";

interface FoodDescriptionProps {

}

const menu = {
    name: 'Kmečka pica',
    image: require('../../assets/pica.png'),
    allergens: ['gluten', 'milk'],
    images: [require('../../assets/pica1.png'), require('../../assets/pica2.png'), require('../../assets/pica3.png')],
    comments: [
        {
            date: '1.12.2022',
            comment:'Pizza was great, but the delivery was late.'
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
}
const FoodDescriptionPage:FC<FoodDescriptionProps> = () => {
    const {params: {dish, price, restaurantID}} = useRoute<RouteProp<RootStackParamList, Routes.FOOD_DESCRIPTION_PAGE>>();
    const [commentSuccess, setCommentSuccess] = useState('');
    const [ratingSuccess, setRatingSuccess] = useState('');

    const [isOpenModal, setIsOpenModal] = useState(false);

    const [rating, setRating] = useState(3);
    const [comment, setComment] = useState("");
    const [active, setActive] = useState<boolean>(false);

    const postComment = useMutation((comment: CommentDishSend) => {
        return post('/restaurant/dish-comments', comment)
    }, {onSuccess: () => setCommentSuccess('Comment successfully sent')});

    const postRating = useMutation((rating: RatingDishSend) => {
        return post('/restaurant/dish-ratings', rating)
    }, {onSuccess: () => setRatingSuccess('Rating successfully sent')})

    const handlePress = ():void => {
        setActive(!active);
    }

    const sendComment = () => {
        postComment.mutate({comment, dishName: dish.name, restaurantId: restaurantID})
        setComment("")
    }

    const sendRating = () => {
        postRating.mutate({rating, dishName: dish.name, restaurantId: restaurantID})
        setRating(3)
    }

    return (
        <>
            <CustomLayout>
                <CustomLayout.Header>
                    <View className='flex flex-row-reverse m-5'>
                        <Heart onPress={handlePress} active={active} color={'pink'} fill={'#fca5a5'} size={18} classname={'w-11 h-11 shadow'}/>
                    </View>
                </CustomLayout.Header>
                <CustomLayout.Main>
                    <View className='flex-1 -mt-24'>
                        <FoodImageCircle foodImage={menu.image}/>
                        <View className='mx-2 flex-1 mt-6'>
                            <Text className='text-lg font-medium text-center mb-5 mx-2.5'>{processText(dish.name)}</Text>
                            <View className='items-center'>
                                <View className='flex-row'>
                                    <Rating rating={4.8} numberOfReviews={230} color={'text-custom-black'}/>
                                    <Price classname={'ml-14'} price={price}/>
                                </View>
                            </View>
                            <ScrollView className='mt-6'>
                                <Text className='text-base font-medium mb-5 ml-2.5'>{translate('courses-header')}</Text>
                                <View className='mx-4'>
                                    {dish.courses.length ? dish.courses.map((course:string, index:number) => {
                                        return (
                                            course === '' ? null : <ListItem key={index} text={course}/>
                                        )
                                    }) : <Text className='opacity-50'>{translate('no-courses')}</Text>}
                                </View>
                                <Text className='text-base font-medium ml-2.5 mb-5 mt-6'>{translate('rate-dish')}</Text>
                                <View className='flex-row items-center mx-4'>
                                    <Text className='opacity-50 py-2 mr-3'>{translate('rating')} {rating}</Text>
                                    {[...Array(5)].map((_, i) => {
                                        const ratingValue = i + 1;
                                        return (
                                            <TouchableOpacity key={ratingValue} onPress={() => setRating(ratingValue)}>
                                                <StarIcon
                                                    color={ratingValue <= rating ? '#FEC532' : '#ccc'}
                                                    size={20}
                                                />
                                            </TouchableOpacity>
                                        );
                                    })}
                                    <View className={'left-36 shadow-md rounded-full bg-custom-yellow px-5 py-2 flex-row-reverse'}>
                                        <Button text={translate('send')} onPress={sendRating} classname={'text-xs'}/>
                                    </View>
                                </View>
                                <Text className='text-green-500 text-xs ml-3 mt-1'>{ratingSuccess}</Text>
                                <Text className='text-base font-medium mb-5 mt-6 ml-2.5'>{translate('food-picture-header')}</Text>
                                <ImageList images={menu.images}/>
                                <View className='-mt-6 flex-row flex-row-reverse right-3'>
                                    <ImageUpload onPress={() => setIsOpenModal(!isOpenModal)}/>
                                </View>
                                <Text className='text-base font-medium mb-5 ml-2.5 mt-3'>{translate('comments-header')}</Text>
                                <View className='mx-4 mb-5'>
                                    {menu.comments.length ? menu.comments.map((comment:any, index) => {
                                        return (
                                            <Comment key={index} date={comment.date} comment={comment.comment}/>
                                        )
                                        }) : <Text className='opacity-50'>{translate('no-comments')}</Text>}

                                    <View className='flex-row items-center mt-3'>
                                        <TextInput className='bg-custom-white rounded-full w-3/4 p-[5px] pl-5 h-12' placeholder={translate('comment-placeholder')}
                                                   value={comment}
                                                   onChangeText={text => setComment(text)}/>
                                        <View className={'ml-7 shadow-md rounded-full bg-custom-yellow px-5 py-2'}>
                                            <Button text={translate('send')} onPress={sendComment} classname={'text-xs'}/>
                                        </View>
                                    </View>
                                    <Text className='text-green-500 text-xs ml-1 mt-1'>{commentSuccess}</Text>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </CustomLayout.Main>
            </CustomLayout>
            {isOpenModal && (
            <Modal onPress={() => setIsOpenModal(!isOpenModal)} naziv={translate('upload-dish')}>
                <View className='w-full rounded-b-xl bg-custom-light-gray p-5'>
                </View>
            </Modal>
            )}
        </>
    );
};

export default FoodDescriptionPage;