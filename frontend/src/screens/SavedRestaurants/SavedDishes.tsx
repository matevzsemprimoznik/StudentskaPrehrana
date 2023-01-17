import {View, Text, ScrollView} from "react-native";
import {FC} from "react";
import CustomLayout from "../../components/CustomLayout";
import {translate} from "../../utils/translations/translate";
import Card from "./Card";
import {HeartIcon} from "react-native-heroicons/solid";
import {useQuery} from "react-query";
import {ISavedMealResponse} from "../../store/models/Restaurant";
import HttpError from "../../store/models/HttpError";
import fetch from "../../utils/fetch";
import Loading from "../../components/Loading";


interface SavedRestaurantProps {
    navigation: any;
}

const SavedDishes: FC<SavedRestaurantProps> = ({navigation}) => {
    const {data: savedMeals, isLoading} = useQuery<ISavedMealResponse, HttpError>('savedMeals', () => fetch(`/user/savedDishes`))

    console.log(savedMeals)
    return (
            <CustomLayout>
                <CustomLayout.Header>
                    <View className='ml-10 mt-28'>
                        <Text className='text-3xl text-custom-white'>{translate('saved-restaurants')}</Text>
                    </View>
                </CustomLayout.Header>
                <CustomLayout.Main>
                    <View className='mx-2 flex-1'>
                        <View className='absolute -top-10 right-8 rounded-full bg-custom-white h-16 w-16 flex items-center justify-center'>
                            <HeartIcon color='#D69D9F' size={35}/>
                        </View>
                        {isLoading ? <Loading/> : (savedMeals && savedMeals.savedDishes.length !== 0) ? <ScrollView className='flex-1 mt-12'>
                            <View className='flex-row justify-between flex-wrap pb-3 px-1'>
                                {savedMeals.savedDishes.map((dish, index) => <Card key={index} dish={dish} navigation={navigation}/>)}
                            </View>
                        </ScrollView>: <View className='pt-20' style={{alignItems: 'center'}}><Text className='opacity-50 w-72 text-center'>{translate('no-saved-dishes')}</Text></View>}


                    </View>
                </CustomLayout.Main>
            </CustomLayout>
    );
}
export default SavedDishes;