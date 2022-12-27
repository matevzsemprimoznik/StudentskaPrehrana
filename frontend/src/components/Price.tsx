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
            <Text className={`font-medium text-xs mt-0.5 ml-1`}>{price.toFixed(2)}€</Text>
        </View>
    );
};

export default Price;