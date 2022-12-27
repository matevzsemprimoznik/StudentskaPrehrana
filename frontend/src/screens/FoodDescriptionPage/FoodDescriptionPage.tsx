import {FC} from 'react';
import {ScrollView, Text, View} from "react-native";
import {translate} from "../../utils/translations/translate";
import CustomLayout from "../../components/CustomLayout";
import FoodImageCircle from "./FoodImageCircle";
import Rating from "../../components/Rating";
import Price from "../../components/Price";
import ListItem from "../../components/ListItem";
import ImageList from "./ImageList";
import { ArrowLongLeftIcon } from "react-native-heroicons/solid";

interface FoodDescriptionProps {

}

const menu = {
    name: 'Kmečka pica',
    image: require('../../assets/pica.png'),
    allergens: ['gluten', 'milk'],
    images: [require('../../assets/pica1.png'), require('../../assets/pica2.png'), require('../../assets/pica3.png')],
}
const FoodDescriptionPage:FC<FoodDescriptionProps> = () => {
    return (
        <CustomLayout>
            <CustomLayout.Header>
                <View className='mx-3 mt-1.5'>
                    <ArrowLongLeftIcon color='white'/>
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
                            <Text className='text-base font-medium mb-5 mt-6 ml-2.5'>{translate('food-picture-header')}</Text>
                            <ImageList images={menu.images}/>
                            <Text className='text-base font-medium mb-5 ml-2.5 mt-3'>{translate('comments-header')}</Text>
                            <View className='mx-4 mb-5'>
                                <Text className='opacity-50'>Here goes the comments component</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </CustomLayout.Main>
        </CustomLayout>
    );
};

export default FoodDescriptionPage;