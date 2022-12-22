import {View, Text, Button, Alert} from "react-native";
import {FC} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
interface HomeProps{
    navigation: any;
}

const showAlert = () =>
    Alert.alert(
        "Test",
        "This is a test alert",
        [
            {
                text: "Cancel",
                onPress: () => Alert.alert("Cancel Pressed"),
            },
        ],
        {
            cancelable: true,
            onDismiss: () =>
                Alert.alert(
                    "This alert was dismissed by tapping outside of the alert dialog."
                ),
        }
    );
const Home:FC<HomeProps> = ({ navigation }) => {
    return (
        <SafeAreaView className='flex-1'>
            <View className="flex-1 items-center justify-center bg-amber-300">
                <Text className='text-2xl m-3'>Home</Text>
                <Button
                    title="Click Here"
                    onPress={showAlert}
                />
            </View>
        </SafeAreaView>
    );
}
export default Home;