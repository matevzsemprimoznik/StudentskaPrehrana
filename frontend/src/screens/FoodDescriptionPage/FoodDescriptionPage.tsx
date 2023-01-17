import {FC, useMemo, useState} from 'react';
import {ScrollView, Text, TextInput,Image, TouchableOpacity, View} from "react-native";
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
import {CommentDishSend, RatingDishSend, SavedMeal} from "../../store/models/Restaurant";
import post from "../../utils/post";
import deleteAxios from "../../utils/delete";
import * as ImagePicker from 'expo-image-picker';
import {ArrowUpOnSquareStackIcon} from "react-native-heroicons/outline";
import toBase64 from "../../utils/images";
import SendButton from "../../components/SendButton";

interface IUploadPicture {
    dishName: string,
    image: string | null | ArrayBuffer
    restaurantID: string
}
interface FoodDescriptionProps {

}
const FoodDescriptionPage:FC<FoodDescriptionProps> = () => {
    const {params: {dish, price, restaurantID, restaurantName}} = useRoute<RouteProp<RootStackParamList, Routes.FOOD_DESCRIPTION_PAGE>>();
    const saveDish = useMutation((dish: SavedMeal) => {
        return post('/user/savedDishes', dish)
    })

    const uploadPictureMutation = useMutation((newImgDish: IUploadPicture) => {
        return post('/restaurant/uploadDishImage', newImgDish)
    })

    const deleteDish = useMutation(async () => {
        return deleteAxios(`/user/savedDishes/${encodeURIComponent(dish.name)}`)
    })
    const [commentSuccess, setCommentSuccess] = useState('');
    const [ratingSuccess, setRatingSuccess] = useState('');

    const [isOpenModal, setIsOpenModal] = useState(false);

    const [rating, setRating] = useState(3);
    const [comment, setComment] = useState("");
    const [active, setActive] = useState<boolean>(dish.saved || false);
    const [imageUri, setImageUri] = useState('');

    const takePicture = async () => {
        const { assets } = await ImagePicker.launchCameraAsync({});
        if (assets) {
            const selectedAsset = assets[0];
            setImageUri(selectedAsset.uri);
        }
    };

    const uploadPicture = async() => {
        if (!imageUri) {
            return;
        }
        const base64img = await toBase64(imageUri);
        uploadPictureMutation.mutate({dishName: dish.name, image: base64img, restaurantID}, {onSuccess: () => {
            setIsOpenModal(false);
        }})
    };

    const postComment = useMutation((comment: CommentDishSend) => {
        return post('/restaurant/dish-comments', comment)
    }, {onSuccess: () => setCommentSuccess('Comment successfully sent')});

    const postRating = useMutation((rating: RatingDishSend) => {
        return post('/restaurant/dish-ratings', rating)
    }, {onSuccess: () => setRatingSuccess('Rating successfully sent')})


    const sendComment = () => {
        postComment.mutate({comment, dishName: dish.name, restaurantId: restaurantID})
        setComment("")
    }

    const sendRating = () => {
        postRating.mutate({rating, dishName: dish.name, restaurantId: restaurantID})
        setRating(3)
    }

    const ratingRounded = useMemo(() => {
        if (dish && dish.ratings && dish.ratings.length) {
            const sum = dish.ratings.reduce((sum, rating) => sum + parseFloat(rating.rating), 0);
            const avgRating = sum / dish.ratings.length;
            return Math.round(avgRating);
        }
        return 5;
    }, [dish])

    const handlePress = ():void => {
        if(!active) {
            dish.images = dish.images || []
            saveDish.mutate({ name: dish.name, restaurant: restaurantName, image: dish.images[0]})
        } else {
            deleteDish.mutate()
        }
        setActive(prevState => !prevState);
    }

    return (
        <>
            <CustomLayout>
                <CustomLayout.Header classname='h-52'>
                    <View className='flex flex-row-reverse m-5'>
                        <Heart onPress={handlePress} active={active} color={'pink'} fill={'#fca5a5'} size={18} classname={'w-11 h-11 shadow'}/>
                    </View>
                </CustomLayout.Header>
                <CustomLayout.Main>
                    <View className='flex-1 -mt-24'>
                        <FoodImageCircle foodImages={dish?.images}/>
                        <View className='mx-2 flex-1 mt-6'>
                            <Text className='text-lg font-medium text-center mb-5 mx-2.5'>{processText(dish.name)}</Text>
                            <View className='items-center'>
                                <View className='flex-row'>
                                    <Rating rating={ratingRounded} numberOfReviews={dish.ratings.length} color={'text-custom-black'}/>
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
                                <View className='flex-row ml-4 mr-2 items-center justify-between'>
                                    <View className='flex-row items-center'>
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
                                    </View>
                                    <SendButton textClassname='text-xs' buttonClassname='w-16 h-8 bg-custom-yellow rounded-full ml-3 items-center justify-center' loading={postRating.isLoading} onPress={sendRating} text={translate('send')}/>
                                </View>
                                <Text className='text-green-500 text-xs ml-3 mt-1'>{ratingSuccess}</Text>
                                <Text className='text-base font-medium mb-5 mt-6 ml-2.5'>{translate('food-picture-header')}</Text>
                                <ImageList images={dish.images}/>
                                <View className='-mt-6 flex-row flex-row-reverse right-3'>
                                    <ImageUpload onPress={() => setIsOpenModal(!isOpenModal)}/>
                                </View>
                                <Text className='text-base font-medium mb-5 ml-2.5 mt-3'>{translate('comments-header')}</Text>
                                <View className='mx-4 mb-5'>
                                    {(dish.comments && dish.comments.length) ? dish.comments.map((comment:any, index) => {
                                        return (
                                            <Comment key={index} date={comment.date} comment={comment.comment}/>
                                        )
                                        }) : <Text className='opacity-50'>{translate('no-comments')}</Text>}
                                    <View className='flex-row items-center justify-between mt-3'>
                                        <TextInput className='bg-custom-white rounded-full w-3/4 pl-5 h-12' placeholder={translate('comment-placeholder')}
                                                   value={comment}
                                                   onChangeText={text => setComment(text)}/>
                                        <SendButton textClassname='text-xs' buttonClassname='w-16 h-8 bg-custom-yellow rounded-full ml-3 items-center justify-center'  loading={postComment.isLoading} onPress={sendComment} text={translate('send')}/>
                                    </View>
                                    <Text className='text-green-500 text-xs ml-2 mt-1'>{commentSuccess}</Text>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </CustomLayout.Main>
            </CustomLayout>
            {isOpenModal && (
                <Modal onPress={() => setIsOpenModal(!isOpenModal)} naziv={translate('upload-dish')}>
                    <View className='w-full h-56 min-h-full rounded-b-xl bg-custom-light-gray p-5 '>
                        <View className='flex-row w-full flex-1 items-center justify-between'>
                            {imageUri ? <Image source={{ uri: imageUri}} className='rounded-xl w-full h-44'/>: <TouchableOpacity onPress={takePicture} className='flex-row h-full flex-1 justify-center border-solid border-2 border-black rounded-lg' style={{alignItems: 'center'}}>
                                <ArrowUpOnSquareStackIcon size={40} color={'#3b3b3b'}/>
                            </TouchableOpacity>}
                        </View>
                        {imageUri && <View className='mt-3 mb-3  flex-row justify-between'>
                            <TouchableOpacity className='border-black border-solid border-2 rounded-full h-12 px-3 flex items-center justify-center' onPress={takePicture}>
                                <Text className='text-black font-medium text-sm'>{translate('food-description-upload-new-image')}</Text>
                            </TouchableOpacity>
                            <SendButton onPress={uploadPicture} loading={uploadPictureMutation.isLoading}/>
                        </View>}

                    </View>
                </Modal>
            )}
        </>
    );
};

export default FoodDescriptionPage;