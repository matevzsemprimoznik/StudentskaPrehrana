import {View, Text, ScrollView} from "react-native";
import {FC} from "react";
import CustomLayout from "../../components/CustomLayout";
import {translate} from "../../utils/translations/translate";
import Card from "./Card";
import {PhoneIcon, MapPinIcon, ClockIcon} from "react-native-heroicons/solid";
import {StarIcon} from "react-native-heroicons/solid";


interface RestaurantProps {
    navigation: any;
}
const Restaurant: FC<RestaurantProps> = ({navigation}) => {

    const restaurant = {
        name: "Ancora",
        location: "Jurčičeva ulica 7, Maribor",
        openingHours: "10:00 - 21:00",
        rating: 4.8,
        numberOfReviews: 230,
        price: 3.60
    }

    const dishesList = [
        {
            name: 'Kmečka pica',
            description: 'Kmečka pica s salamo in papriko iz krušne peči.',
            rating: 4.8,
            numberOfReviews: 230,
            image: require('../../assets/pizza.png')
        },{
            name: 'Kmečka pica',
            description: 'Kmečka pica s salamo in papriko iz krušne peči.',
            rating: 4.8,
            numberOfReviews: 230,
            image: require('../../assets/pizza.png')
        },{
            name: 'Kmečka pica',
            description: 'Kmečka pica s salamo in papriko iz krušne peči.',
            rating: 4.8,
            numberOfReviews: 230,
            image: require('../../assets/pizza.png')
        }
        ,{
            name: 'Kmečka pica',
            description: 'Kmečka pica s salamo in papriko iz krušne peči.',
            rating: 4.8,
            numberOfReviews: 230,
            image: require('../../assets/pizza.png')
        }
        ,{
            name: 'Kmečka pica',
            description: 'Kmečka pica s salamo in papriko iz krušne peči.',
            rating: 4.8,
            numberOfReviews: 230,
            image: require('../../assets/pizza.png')
        }
        ,{
            name: 'Kmečka pica',
            description: 'Kmečka pica s salamo in papriko iz krušne peči.',
            rating: 4.8,
            numberOfReviews: 230,
            image: require('../../assets/pizza.png')
        }
    ]

    return (
        <CustomLayout>
            <CustomLayout.Header backgroundImage={require('../../assets/ancora-large.png')}>
                <View className='ml-10 mt-28'>
                    <Text className='text-5xl text-custom-white'>{restaurant.name}</Text>
                    <View className='flex-row'>
                        <StarIcon color="#FEC532" size={18}/>
                        <StarIcon color="#FEC532" size={18}/>
                        <StarIcon color="#FEC532" size={18}/>
                        <StarIcon color="#FEC532" size={18}/>
                    </View>
                </View>
            </CustomLayout.Header>
            <CustomLayout.Main>
                <View className='mx-2 flex-1'>
                    <View className='absolute -top-14 right-8 rounded-full bg-custom-yellow h-20 w-20 flex items-center justify-center'>
                        <Text className='text-lg text-custom-white font-medium shadow'>{`${restaurant.price.toFixed(2)}€`}</Text>
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
                            <Text className='text-xs font-medium mt-2'>{`${restaurant.rating} (${restaurant.numberOfReviews})` }</Text>
                        </View>

                    </View>
                    <View className='mb-5 mt-6 mx-2.5 flex-row justify-between items-center'>
                        <Text className='text-lg font-medium '>{translate('restaurant-main-title')}</Text>
                        <Text>{translate('restaurant-main-comments')}</Text>
                    </View>
                    <ScrollView className='flex-1'>
                        <View className='flex-row justify-between flex-wrap pb-3 px-1'>
                            {dishesList.map((dish, index) => <Card key={index} dish={dish} navigation={navigation}/>)}
                        </View>
                    </ScrollView>
                </View>
            </CustomLayout.Main>
        </CustomLayout>
    );
}
export default Restaurant;