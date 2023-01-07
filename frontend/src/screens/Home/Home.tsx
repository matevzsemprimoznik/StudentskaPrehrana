import {View, Text, ScrollView, ImageSourcePropType} from "react-native";
import {FC} from "react";
import CustomLayout from "../../components/CustomLayout";
import SearchBar from "../../components/SearchBar";
import {translate} from "../../utils/translations/translate";
import CategoryList from "./CategoryList";
import Card from "./Card";
import {useQuery} from "react-query";
import fetch from "../../utils/fetch";
import {HomeRestaurant} from "../../store/models/Restaurant";
import HttpError from "../../store/models/HttpError";
import {AxiosError} from "axios";


interface HomeProps {
}
const Home: FC<HomeProps> = () => {
    const {data} = useQuery<HomeRestaurant[], AxiosError<HttpError>>('restaurants', () => fetch('/restaurant/all'))

    return (
        <CustomLayout>
            <CustomLayout.Header>
                <View className='m-10 mb-36'>
                    <Text className='text-lg font-medium mb-4'>{translate('home-header')}</Text>
                    <SearchBar/>
                </View>
            </CustomLayout.Header>
            <CustomLayout.Main>
                <View className='mx-2 flex-1'>
                    <CategoryList/>
                    <Text className='text-lg font-medium mb-5 mt-6 ml-2.5'>{translate('home-main-title')}</Text>
                    <ScrollView className='flex-1'>
                        <View className='flex-row justify-between flex-wrap pb-3'>
                            {data?.slice(0, 10).map((restaurant, index) => <Card key={index} restaurant={restaurant} ratingColor={'text-custom-white'}/>)}
                        </View>
                    </ScrollView>
                </View>
            </CustomLayout.Main>
        </CustomLayout>
    );
}
export default Home;