import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInfo } from '@/types/user';
import { useGlobalData } from '@/context/GlobalContext';
import { backend } from '@env';

export default function useCheckUserCredentials() {
    const { setUserInfo, userInfo } = useGlobalData();

    const checkUserCredentials = async () => {
        try {
            const user = await getLocalUser();

            if (!user) {
                console.log("No user info loaded");
                router.push("/login");
                return;
            }

            const googleUser = await checkJWT(user.accessToken);

            if (!googleUser) {
                console.log("Google user not found");
                return;
            }

            const backendUserData = await getUserInfoFromBackend(googleUser);

            if (backendUserData) {
                const currentUserData = {
                    ...googleUser,
                    profile_cover: backendUserData.profile_cover || "",
                    bio: backendUserData.bio || "",
                };

                setUserInfo(currentUserData);
                router.push("/(drawer)/");
            } else {
                console.log("Backend user data not found");
            }
        } catch (error) {
            console.error("Failed to check user credentials", error);
            router.push("/login");
        }
    };

    const getLocalUser = async (): Promise<UserInfo | null> => {
        try {
            const data = await AsyncStorage.getItem("@user");
            return data ? (JSON.parse(data) as UserInfo) : null;
        } catch (error) {
            console.error("Failed to get local user", error);
            return null;
        }
    };

    const checkJWT = async (token: string): Promise<UserInfo | null> => {
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!response.ok) {
                console.error("Failed to verify JWT, redirecting to login");
                setUserInfo({} as UserInfo);
                router.push("/login");
                return null;
            }

            const user = (await response.json()) as UserInfo;
            user.accessToken = token;
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);

            return user;
        } catch (error) {
            console.error("Failed to fetch user info", error);
            setUserInfo({} as UserInfo);
            router.push("/login");
            return null;
        }
    };

    const getUserInfoFromBackend = async (user: UserInfo): Promise<UserInfo | null> => {
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
                return null;
            }

            const data = await response.json();
            console.log("User info from backend:", data);
            return data;
        } catch (error) {
            console.error("Failed to fetch user info from backend", error);
            return null;
        }
    };

    return { checkUserCredentials, userInfo }
}
