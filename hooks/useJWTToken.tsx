import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useJWTToken() {

    const getJWTToken = async (): Promise<string | null> => {
        const JWTtoken = await AsyncStorage.getItem("@JWTtoken");
        if (JWTtoken) {
            return JWTtoken
        } else {
            router.push("/login"); // Redirect to login if no user is found
            return null
        }
    };
    return {
        getJWTToken
    };
}
