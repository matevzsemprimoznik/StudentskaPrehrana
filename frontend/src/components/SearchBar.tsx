import {View, Image, Text, TextInput} from "react-native";
import SearchIcon from "../assets/search.png";
import {translate} from "../utils/translations/translate";

const SearchBar = () => {
    return (
        <View className='w-full'>
            <Image source={SearchIcon} className='absolute top-3 scale-110 left-3 z-20'/>
            <TextInput className='bg-custom-white rounded-full w-full p-[5px] pl-10' placeholder={translate('home-header-search')}/>
        </View>
    )
}
export default SearchBar;