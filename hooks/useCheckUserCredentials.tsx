import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInfo } from '@/types/user';
import { useGlobalData } from '@/context/GlobalContext';

export default function useCheckUserCredentials() {

    const { setUserInfo } = useGlobalData();

    const checkUserCredentials = async () => {
        const user = await getLocalUser();

        if (user) {
            const googleUser = await checkJWT(user.accessToken); // Await the result of checkJWT

            if (googleUser) {
                const backendUserData = await getUserInfoFromBackend(googleUser);

                // Combine googleUser and backendUserData into a single object
                const currentUserData = {
                    ...googleUser,
                    profile_cover: backendUserData?.profile_cover || "",
                    bio: backendUserData?.bio || ""
                };

                setUserInfo(currentUserData);
                router.push("/(drawer)/");
            }
        } else {
            console.log("no user info loaded");
            router.push("/login");
        }
    };


    const getLocalUser = async (): Promise<UserInfo | null> => {
        const data = await AsyncStorage.getItem("@user");
        if (!data) return null;
        return JSON.parse(data) as UserInfo;
    };

    const checkJWT = async (token: string): Promise<UserInfo | null> => {

        let googleUser = null as UserInfo | null
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.ok) {
                const user = (await response.json()) as UserInfo;
                user.accessToken = token
                await AsyncStorage.setItem("@user", JSON.stringify(user));
                setUserInfo(user);
                googleUser = user
                router.push("/(drawer)/");
            } else {
                googleUser = null
                setUserInfo({} as UserInfo);
                router.push("/login");
            }

        } catch (error) {
            googleUser = null
            console.error("Failed to fetch user info", error);
        }
        return googleUser
    };


    const getUserInfoFromBackend = async (user: UserInfo | null) => {
        try {
            const response = await fetch("http://192.168.0.117:4000/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": user?.id || "",
                    "username": user?.name || "",
                    "email": user?.email || "",
                    "profile_avatar": user?.picture || ""
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("User info:", data);
            return data;

        } catch (error) {
            console.error("Failed to fetch user info from backed", error);
        }
    }

    return checkUserCredentials
}