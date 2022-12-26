import {FC} from 'react';
import {View, Text} from "react-native";

interface ListItemProps {
    text: string;
}
const ListItem:FC<ListItemProps> = ({ text }) => {
    return (
        <View>
            <Text className='opacity-50'>• {text}</Text>
        </View>
    );
};

export default ListItem;