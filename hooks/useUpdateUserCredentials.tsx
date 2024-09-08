import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleUserInfo, UserInfo } from '@/types/user';
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
        console.log("Fetching Google user info from login page");
        try {
            const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch Google user info");
            }


            const googleUser = (await response.json()) as GoogleUserInfo;
            if (googleUser.name !== "") {
                await AsyncStorage.setItem("@token", JSON.stringify(accessToken));
                console.log("Google user info:", googleUser);

                const backendUserData = await registerUser(googleUser);
                if (backendUserData) {
                    await AsyncStorage.setItem("@user", JSON.stringify(backendUserData));
                    setUserInfo(backendUserData);
                    router.push("/(drawer)/");
                } else {
                    console.log("Backend user data not found");
                }
            }

        } catch (error) {
            console.error("Error fetching Google user info:", error);
        }
    };

    const registerUser = async (user: GoogleUserInfo): Promise<UserInfo> => {
        try {
            const response = await fetch(`${backend}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: user.id,
                    username: user.name,
                    email: user.email,
                    profileAvatar: user.picture
                }),
            });

            if (!response.ok) {
                throw new Error(`Backend error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error registering user with backend:", error);
        }
        return {} as UserInfo;
    };

    return {
        request,
        promptAsync,
    };
}
