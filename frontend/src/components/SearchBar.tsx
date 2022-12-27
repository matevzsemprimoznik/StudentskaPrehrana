import {View, TextInput} from "react-native";
import {translate} from "../utils/translations/translate";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";

const SearchBar = () => {
    return (
        <View className='w-full top-3'>
            <View className='absolute top-1.5 scale-110 left-2 z-20'>
                <MagnifyingGlassIcon fill="black" size={16}/>
            </View>
            <TextInput className='bg-custom-white rounded-full w-full p-[5px] pl-8' placeholder={translate('home-header-search')}/>
        </View>
    )
}
export default SearchBar;