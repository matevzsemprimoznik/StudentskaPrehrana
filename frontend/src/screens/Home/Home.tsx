import {View, Text, ScrollView} from "react-native";
import {FC} from "react";
import CustomLayout from "../../components/CustomLayout";
import SearchBar from "../../components/SearchBar";
import {translate} from "../../utils/translations/translate";
import CategoryList from "./CategoryList";
import Card from "./Card";

interface HomeProps {
    navigation: any;
}
const Home: FC<HomeProps> = ({navigation}) => {
    const restaurantList = [
        {
            name: 'Ancora',
            rating: 4.5,
            numberOfReviews: 100,
            image: require('../../assets/ancora.png')
        },{
            name: 'Ancora',
            rating: 4.5,
            numberOfReviews: 100,
            image: require('../../assets/ancora.png')
        },{
            name: 'Ancora',
            rating: 4.5,
            numberOfReviews: 100,
            image: require('../../assets/ancora.png')
        }
        ,{
            name: 'Ancora',
            rating: 4.5,
            numberOfReviews: 100,
            image: require('../../assets/ancora.png')
        }
        ,{
            name: 'Ancora',
            rating: 4.5,
            numberOfReviews: 100,
            image: require('../../assets/ancora.png')
        }
        ,{
            name: 'Ancora',
            rating: 4.5,
            numberOfReviews: 100,
            image: require('../../assets/ancora.png')
        }
    ]
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
                            {restaurantList.map((restaurant, index) => <Card key={index} restaurant={restaurant} ratingColor={'text-custom-white'} navigation={navigation}/>)}
                        </View>
                    </ScrollView>
                </View>
            </CustomLayout.Main>
        </CustomLayout>
    );
}
export default Home;