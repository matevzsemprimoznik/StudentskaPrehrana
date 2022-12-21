import {View, Text, Button} from "react-native";
import {FC} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
interface HomeProps{
    navigation: any;
}

const Home:FC<HomeProps> = ({ navigation }) => {
    return (
        <SafeAreaView className='flex-1'>
            <View className="flex-1 items-center justify-center bg-amber-300">
                <Text className='text-2xl m-3'>Home</Text>
                <Button
                    title="Click Here"
                />
            </View>
        </SafeAreaView>
    );
}
export default Home;