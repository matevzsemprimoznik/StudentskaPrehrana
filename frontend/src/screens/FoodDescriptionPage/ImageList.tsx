import {FC} from 'react';
import {Image, ImageSourcePropType, ScrollView, View} from "react-native";

interface ImageListProps {
    images: ImageSourcePropType[];
}
const ImageList:FC<ImageListProps> = ({ images }) => {
    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className='px-2 mt-1.5'>
                {images.map((image, index) =>
                    <View
                        key={index}>
                        <Image source={image} className='rounded-xl mx-2 w-56 h-36'/>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default ImageList;