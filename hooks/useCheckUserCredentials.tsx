import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleUserInfo, UserInfo } from '@/types/user';
import { useGlobalData } from '@/context/GlobalContext';
import { backend } from '@env';

export default function useCheckUserCredentials() {
    const { setUserInfo, userInfo } = useGlobalData();

    const checkUserCredentials = async () => {
        try {
            const token = await AsyncStorage.getItem("@token")

            const googleUser = await checkJWT(token || '');

            if (!googleUser.name) {
                console.log("Google user not found form layout component");
                router.push("/login");
                return;
            }
            const backendUserData = await LoginAndRefreshUser(googleUser);

            if (backendUserData) {
                setUserInfo(backendUserData)
                await AsyncStorage.setItem("@user", JSON.stringify(backendUserData));
                router.push("/(drawer)/");
            }

        } catch (error) {
            console.error("Failed to check user credentials", error);
            router.push("/login");
        }
    };

    const checkJWT = async (token: string): Promise<GoogleUserInfo> => {
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!response.ok) {
                console.error("Failed to verify JWT, redirecting to login");
                return {} as GoogleUserInfo;
            }

            const user = (await response.json()) as GoogleUserInfo;
            return user;
        } catch (error) {
            console.error("Failed to fetch user info", error);
            return {} as GoogleUserInfo;
        }
    };

    const LoginAndRefreshUser = async (user: GoogleUserInfo): Promise<UserInfo> => {
        try {
            const response = await fetch(`${backend}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: user.id,
                    username: user.name,
                    email: user.email,
                    profile_avatar: user.picture,
                }),
            });

            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
                return {} as UserInfo;
            }

            const data = await response.json();
            console.log("User info from backend:", data);
            return data;
        } catch (error) {
            console.error("Failed to fetch user info from backend", error);
            return {} as UserInfo;
        }
    };

    return { checkUserCredentials, userInfo }
}
