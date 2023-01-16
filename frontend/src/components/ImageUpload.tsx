import {FC, useState} from 'react';
import {Pressable, View} from 'react-native';
import { PhotoIcon } from "react-native-heroicons/outline";

interface ImageUploadProps {
    onPress: () => void;
}

const ImageUpload:FC<ImageUploadProps> = ({ onPress }) => {
    // if user is not signed in then the button should be disabled
    const [disabled, setDisabled] = useState<boolean>(false);

    return (
        <Pressable disabled={disabled} onPress={onPress}>
            <View className='bg-custom-yellow rounded-full flex justify-center items-center w-11 h-11 shadow-md'>
                <PhotoIcon color={'black'} size={20}/>
            </View>
        </Pressable>
    );
};

export default ImageUpload;