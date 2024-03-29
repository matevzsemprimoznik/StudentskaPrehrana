import {View, Text, ScrollView} from "react-native";
import {FC, useMemo, useState} from "react";
import CustomLayout from "../../components/CustomLayout";
import SearchBar from "../../components/SearchBar";
import {translate} from "../../utils/translations/translate";
import CategoryList from "./CategoryList";
import Card from "./Card";
import {useQuery} from "react-query";
import fetch from "../../utils/fetch";
import {HomeRestaurant} from "../../store/models/Restaurant";
import HttpError from "../../store/models/HttpError";
import Loading from "../../components/Loading";

interface HomeProps {
}
const Home: FC<HomeProps> = () => {
    const {data, isLoading} = useQuery<HomeRestaurant[], HttpError>('restaurants', () => fetch('/restaurant/all'))
    const [query, setQuery] = useState('')
    const [categoryIndex, setCategoryIndex] = useState(0)

    const categories = useMemo(() => {
        const categories = data?.flatMap(restaurant => restaurant.extras)
        const allCategory = translate('categories-all')
        return categories ? [...new Set([ allCategory, ...categories])] : [allCategory]
    }, [data])

    const restaurants = useMemo(() => {
        if(!data) return []
        return data.filter(restaurant => restaurant.title.toLowerCase().includes(query.toLowerCase()) && (categoryIndex === 0 || restaurant.extras.includes(categories[categoryIndex])))
    }, [data, query, categoryIndex])

    return (
        <CustomLayout>
            <CustomLayout.Header>
                <View className='m-10 mb-36'>
                    <Text className='text-lg font-medium mb-4'>{translate('home-header')}</Text>
                    <SearchBar value={query} onChange={setQuery}/>
                </View>
            </CustomLayout.Header>
            <CustomLayout.Main>
                <View className='mx-2 flex-1'>
                    <CategoryList values={categories} setSelectedIndex={setCategoryIndex} selectedIndex={categoryIndex}/>
                    <Text className='text-lg font-medium mb-5 mt-6 ml-2.5'>{translate('home-main-title')}</Text>
                    {isLoading ? <Loading/> : <ScrollView className='flex-1'>
                        <View className='flex-row justify-between flex-wrap pb-3'>
                            {restaurants?.slice(0, 10).map((restaurant, index) => <Card key={index} restaurant={restaurant} ratingColor={'text-custom-white'}/>)}
                        </View>
                    </ScrollView>}
                </View>
            </CustomLayout.Main>
        </CustomLayout>
    );
}
export default Home;