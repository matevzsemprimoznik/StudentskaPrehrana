import {View, Text, ScrollView} from "react-native";
import {FC} from "react";
import CustomLayout from "../../components/CustomLayout";
import {translate} from "../../utils/translations/translate";
import Card from "./Card";
import {HeartIcon} from "react-native-heroicons/solid";


interface SavedRestaurantProps {
    navigation: any;
}

const SavedRestaurant: FC<SavedRestaurantProps> = ({navigation}) => {

    const dishesList = [
        {
            name: 'Kmečka pica',
            rating: 4.8,
            numberOfReviews: 230,
            restaurant: 'Ancora',
            comment: 'Super je bilo. Zelo sočno in okusno.',
            image: require('../../assets/pica5.png')
        }, {
            name: 'Kmečka pica',
            rating: 4.8,
            numberOfReviews: 230,
            restaurant: 'Ancora',
            comment: 'Super je bilo. Zelo sočno in okusno.',
            image: require('../../assets/pica5.png')
        }, {
            name: 'Kmečka pica',
            rating: 4.8,
            numberOfReviews: 230,
            restaurant: 'Ancora',
            comment: 'Super je bilo. Zelo sočno in okusno.',
            image: require('../../assets/pica5.png')
        }
    ]

    return (
            <CustomLayout>
                <CustomLayout.Header>
                    <View className='ml-10 mt-28'>
                        <Text className='text-3xl text-custom-white'>{translate('saved-restaurants')}</Text>
                    </View>
                </CustomLayout.Header>
                <CustomLayout.Main>
                    <View className='mx-2 flex-1'>
                        <View className='absolute -top-14 right-8 rounded-full bg-custom-white h-20 w-20 flex items-center justify-center'>
                            <HeartIcon color='#D69D9F' size={40}/>
                        </View>
                        <ScrollView className='flex-1 mt-12'>
                            <View className='flex-row justify-between flex-wrap pb-3 px-1'>
                                {dishesList.map((dish, index) => <Card key={index} dish={dish} navigation={navigation}/>)}
                            </View>
                        </ScrollView>

                    </View>
                </CustomLayout.Main>
            </CustomLayout>
    );
}
export default SavedRestaurant;