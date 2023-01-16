import {FC, useState} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import Rating from "../../components/Rating";
import Heart from "../../components/Heart";
import {navigationRef} from "../../components/Navigation/NavigationBar";
import {Routes} from "../../../routes";
import {Meal, SavedMeal} from "../../store/models/Restaurant";
import {PhotoIcon} from 'react-native-heroicons/solid'
import {useMutation} from "react-query";
import post from "../../utils/post";
import deleteAxios from "../../utils/delete";
import {REST_URI} from "@env";

interface CardProps{
    dish: Meal;
    restaurantName: string;
    isSaved: boolean;
    price: string;
    restaurantID: string;
}

const Card:FC<CardProps> = ({dish, restaurantName, isSaved, price, restaurantID}) => {

    const saveDish = useMutation((dish: SavedMeal) => {
        console.log(dish)
        return post('/user/savedDishes', dish)
    })

    const deleteDish = useMutation(async () => {
        return deleteAxios(`/user/savedDishes/${"63c01c8b6edc79428b10b00b"}/${encodeURIComponent(dish.name)}`)
    })

    const [active, setActive] = useState<boolean>(isSaved);

    const handlePress = ():void => {
        if(!active) {
            dish.images = dish.images || []
            //TODO tu more bit id od userja
            saveDish.mutate({id: "63c01c8b6edc79428b10b00b", name: dish.name, restaurant: restaurantName, image: dish.images[0]})
        } else {
            //const {data, isLoading} = useQuery<IRestaurant, HttpError>('restaurant', () => deleteAxios(`/savedDishes/${"63befd925b00e6e138e5eee3"}/${dish.name}`))
            deleteDish.mutate()
        }
        setActive(!active);
    }

    return (
        <TouchableOpacity activeOpacity={1} className='rounded-xl w-full mb-4 bg-custom-white flex flex-row' onPress={() => navigationRef.navigate(Routes.FOOD_DESCRIPTION_PAGE as never, { dish: dish, price: price, restaurantID } as never)}>
            {dish.images && dish.images[0] != null ? <Image source={{uri: `${REST_URI}/images/dishes/${dish.images[0]}`}} className='rounded-l-xl h-full basis-1/3 '/> : <View className='w-28 justify-center' style={{alignItems: 'center'}}><PhotoIcon size={30} color={'#d5d5d5'}/></View>}
            <View className='basis-2/3'>
                <Text className='text-md font-medium mb-2 mt-6 ml-2.5'>{dish.name}</Text>
                <Text className='mb-10 opacity-50 mt-2 mx-2.5'>{dish.description}</Text>
                <View className='absolute top-0 right-0'>
                    <Heart onPress={handlePress} active={active} color={'pink'} fill={'#fca5a5'} size={22} classname='pl-7 pb-7 pr-4 pt-4'/>
                </View>
                <View className='absolute bottom-3 right-3	'>
                    <Rating rating={dish.rating || 0} numberOfReviews={dish.numberOfReviews || 0} />
                </View>

            </View>
        </TouchableOpacity>
    )
}

export default Card;