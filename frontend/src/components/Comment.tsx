import {FC} from 'react';
import {View, Text} from "react-native";
import { UserCircleIcon } from "react-native-heroicons/solid";

interface CommentProps{
    date: string;
    comment: string;
}
const Comment:FC<CommentProps> = ({ date, comment }) => {

    const getRandomColor = () => {
        const colors = ['#45AAE3', '#FF8484', '#57C081', '#D9D9D9', '#FEC532'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    return (
        <View className='bg-custom-white flex-row px-2 py-2.5 my-0.5 rounded-xl'>
            <UserCircleIcon color={getRandomColor()} size={50}/>
            <View className='mx-2'>
                <Text className='text-custom-yellow text-xs'>{date}</Text>
                <Text className='opacity-50 mt-1'>{comment}</Text>
            </View>
        </View>
    );
};

export default Comment;