import {ScrollView, View, Text} from "react-native";
import {useState} from "react";

const CategoryList = () => {
    const categoryList = ['Priporočeno', 'Mehiška', 'Indijska', 'Korejska', 'Domača']
    const [selectedCategory, setSelectedCategory] = useState(categoryList[0])

    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className='px-2 mt-1.5'>
                {categoryList.map((category, index) =>
                    <View
                        className={`${category === selectedCategory ? 'bg-custom-yellow' : 'bg-custom-white'} -z-50 rounded-full h-10 mr-3 mt-3 px-4 py-2 pt-2.5`}
                        key={index}>
                        <Text className='text-custom-black text-xs'>{category}</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

export default CategoryList;