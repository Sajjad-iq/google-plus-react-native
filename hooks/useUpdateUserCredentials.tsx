import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInfo } from '@/types/user';
import { useGlobalData } from '@/context/GlobalContext';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { androidClientId, iosClientId, webClientId, backend } from '@env';

WebBrowser.maybeCompleteAuthSession();

export default function useUpdateUserCredentials() {
    const [token, setToken] = useState<string | null>(null);
    const { setUserInfo } = useGlobalData();

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: androidClientId,
        iosClientId: iosClientId,
        webClientId: webClientId,
    });

    useEffect(() => {
        if (response?.type === "success" && response.authentication?.accessToken) {
            setToken(response.authentication.accessToken);
        }
    }, [response]);

    useEffect(() => {
        if (token) {
            getUserInfo(token);
        }
    }, [token]);

    const getUserInfo = async (accessToken: string) => {
        try {
            const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch Google user info");
            }

            const googleUser = (await response.json()) as UserInfo;
            googleUser.accessToken = accessToken;

            const backendUserData = await registerUser(googleUser);
            if (backendUserData) {
                const currentUserData = {
                    ...googleUser,
                    profile_cover: backendUserData.profile_cover || "",
                    bio: backendUserData.bio || "",
                };
                await AsyncStorage.setItem("@user", JSON.stringify(backendUserData));
                setUserInfo(currentUserData);
                router.push("/(drawer)/");
                console.log(currentUserData)
            } else {
                console.log("Backend user data not found");
                await AsyncStorage.setItem("@user", JSON.stringify(googleUser));
                setUserInfo(googleUser);
            }
            router.push("/(drawer)/");
        } catch (error) {
            console.error("Error fetching Google user info:", error);
            router.push("/login");
        }
    };

    const registerUser = async (user: UserInfo) => {
        try {
            const response = await fetch(`${backend}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: user.id,
                    username: user.name,
                    email: user.email,
                    profile_avatar: user.picture
                }),
            });

            if (!response.ok) {
                throw new Error(`Backend error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error registering user with backend:", error);
        }
    };

    return {
        request,
        promptAsync,
    };
}
