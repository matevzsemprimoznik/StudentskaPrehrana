import {FC} from 'react';
import {Image, ScrollView, View} from "react-native";
import {REST_URI} from "@env";

interface ImageListProps {
    images: string[] | undefined;
}
const ImageList:FC<ImageListProps> = ({ images }) => {
    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className='px-2 mt-1.5'>
                {images!.map((image, index) =>
                    <View
                        key={index}>
                        <Image source={{uri: `${REST_URI}/images/dishes/${image}`}} className='rounded-xl mx-2 w-56 h-36'/>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default ImageList;