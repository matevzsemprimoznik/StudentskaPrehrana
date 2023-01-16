import {FC} from 'react';
import {Text, View} from "react-native";
import { BanknotesIcon } from "react-native-heroicons/outline";

interface PriceProps{
    price: string;
    classname?: string;
}
const Price:FC<PriceProps> = ({ price,classname }) => {
    return (
        <View className={`flex-row ${classname}`}>
            <BanknotesIcon color="#1EB82D" size={18}/>
            <Text className={`font-medium text-xs mt-0.5 ml-1`}>{parseFloat(price).toFixed(2)}€</Text>
        </View>
    );
};

export default Price;