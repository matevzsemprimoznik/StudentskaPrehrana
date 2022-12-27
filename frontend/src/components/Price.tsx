import {FC} from 'react';
import {Text, View} from "react-native";
import { BanknotesIcon } from "react-native-heroicons/outline";

interface PriceProps{
    price: number;
    classname?: string;
}
const Price:FC<PriceProps> = ({ price,classname }) => {
    return (
        <View className={`flex-row ${classname}`}>
            <BanknotesIcon color="green" size={18}/>
            <Text className={`text-xs`}>{price}€</Text>
        </View>
    );
};

export default Price;