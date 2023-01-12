import React, {FC, useState} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View, Image} from "react-native";
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
import SendButton from "../../components/SendButton";
import {PaperAirplaneIcon, StarIcon} from "react-native-heroicons/solid";
import {ArrowUpOnSquareStackIcon} from "react-native-heroicons/outline";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import * as ImagePicker from 'expo-image-picker';
import toBase64 from "../../utils/images";
import {useMutation} from "react-query";
import post from '../../utils/post';


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

    const mutation = useMutation(newImgDish => {
        const size = encodeURI(JSON.stringify(newImgDish)).split(/%..|./).length - 1;
        console.log(size)
           return post('/restaurant/uploadDishImage', newImgDish)
    })

    const [isOpenModal, setIsOpenModal] = useState(false);

    const [rating, setRating] = useState(3);
    const [comment, setComment] = useState("");
    const [imageUri, setImageUri] = useState(null);

    const takePicture = async () => {
            const { assets } = await ImagePicker.launchCameraAsync({});
            if (assets) {
                const selectedAsset = assets[0];
                // @ts-ignore
                setImageUri(selectedAsset.uri);
            }
    };

    const uploadPicture = async() => {
        if (!imageUri) {
            return;
        }
        const base64img = await toBase64(imageUri);

        // @ts-ignore
        mutation.mutate({id: "63b9a50e4b1ad1654e909342", dishName: "ZAVITKI S PAPRIKO, PRILOGA", image: base64img}, {onerror: (err) => {
                console.log(err.response)
            }})
    };

    const sendComment = () => {
        //send "comment"
        setComment("")
    }

    const sendRating = () => {
        //send "rating"
    }

    return (
        <>
            <CustomLayout>
                <CustomLayout.Header>
                    <View className='flex flex-row-reverse m-5'>
                        <Heart color={'pink'} fill={'#fca5a5'} size={18} classname={'w-11 h-11 shadow'}/>
                    </View>
                </CustomLayout.Header>
                <CustomLayout.Main>
                    <View className='flex-1 -mt-24'>
                        <FoodImageCircle foodImage={menu.image}/>
                        <View className='mx-2 flex-1 mt-6'>
                            <Text className='text-lg font-medium text-center mb-5 mx-2.5'>{menu.name}</Text>
                            <View className='items-center'>
                                <View className='flex-row'>
                                    <Rating rating={4.8} numberOfReviews={230} color={'text-custom-black'}/>
                                    <Price classname={'ml-14'} price={3.60}/>
                                </View>
                            </View>
                            <ScrollView className='mt-6'>
                                <Text className='text-base font-medium mb-5 ml-2.5'>{translate('food-description-header')}</Text>
                                <View className='mx-2'>
                                    <Text className='opacity-50'>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation  "}</Text>
                                </View>
                                <Text className='text-base font-medium mb-5 mt-6 ml-2.5'>{translate('food-allergens-header')}</Text>
                                <View className='mx-4'>
                                    {menu.allergens.length ? menu.allergens.map((allergen, index) => {
                                        return (
                                            <ListItem key={index} text={allergen}/>
                                        )
                                    }) : <Text className='opacity-50'>{translate('no-allergens')}</Text>}
                                </View>
                                <Text className='text-base font-medium ml-2.5 mb-5 mt-6'>{translate('rate-dish')}</Text>
                                <View className='flex-row items-center space-between mx-4'>
                                    <Text className='opacity-50 py-2 mr-3'>{translate('rating')} {rating}</Text>
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
                                        <SendButton onPress={sendComment} />
                                    </View>

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
                        {imageUri ? <Image source={{ uri: imageUri}} className='rounded-xl w-full h-44' /> : <TouchableOpacity onPress={takePicture} className='flex-row h-full flex-1 justify-center border-solid border-2 border-black rounded-lg' style={{alignItems: 'center'}}>
                            <ArrowUpOnSquareStackIcon size={40} color={'#3b3b3b'}/>
                        </TouchableOpacity>}
                    </View>
                    {imageUri && <View className='mt-3 mb-3  flex-row justify-between'>
                        <TouchableOpacity className='border-black border-solid border-2 rounded-full h-12 px-3 flex items-center justify-center' onPress={takePicture}>
                            <Text className='text-black font-medium text-sm'>{translate('food-description-upload-new-image')}</Text>
                            </TouchableOpacity>
                        <SendButton onPress={uploadPicture} />
                    </View>}

                </View>
            </Modal>
            )}
        </>
    );
};

export default FoodDescriptionPage;