import {ScrollView, View, Text, TouchableOpacity} from "react-native";
import {FC, useState} from "react";

interface CategoryListProps {
    values: string[];
    selectedIndex: number,
    setSelectedIndex: (value: number) => void
}
const CategoryList:FC<CategoryListProps> = ({values, selectedIndex, setSelectedIndex}) => {
    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className='px-2 mt-1.5'>
                {values.map((category, index) =>
                    <TouchableOpacity activeOpacity={0.3} onPress={() => setSelectedIndex(index)}
                        className={`${index === selectedIndex ? 'bg-custom-yellow' : 'bg-custom-white'} -z-50 rounded-full h-10 mr-3 mt-3 px-4 py-2 pt-2.5`}
                        key={index}>
                        <Text className='text-custom-black text-xs'>{category}</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    )
}

export default CategoryList;