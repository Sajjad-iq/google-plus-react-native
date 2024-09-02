import { useEffect, useState } from 'react'
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInfo } from '@/types/user';
import { useGlobalData } from '@/context/GlobalContext';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";


WebBrowser.maybeCompleteAuthSession();

export default function useUpdateUserCredentials() {

    const [token, setToken] = useState<string | null>(null);
    const { setUserInfo } = useGlobalData()

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "405151643043-uc2ri8uossg0d3up8bkdnl6pvhfv0tle.apps.googleusercontent.com",
        iosClientId: "405151643043-q4qbotpb83d4c6kb0cm76ktgf8nm0sl1.apps.googleusercontent.com",
        webClientId: "405151643043-h2ekvbsd9nj850d0u1ttkbg1h301bfvk.apps.googleusercontent.com",
    });

    async function handleUpdateUserInfo() {
        if (response?.type === "success" && response.authentication?.accessToken) {
            setToken(response.authentication.accessToken);
            getUserInfo(response.authentication.accessToken);
        }
    }

    const getUserInfo = async (token: string) => {
        if (!token) return;
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const user = (await response.json()) as UserInfo;
            user.accessToken = token
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
            registerUser(user)
            router.push("/(drawer)/")
        } catch (error) {
            console.error("Failed to fetch user info form login screen", error);
        }
    };

    const registerUser = async (user: UserInfo | null) => {
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
    useEffect(() => {
        handleUpdateUserInfo();
    }, [response, token]);

    return {
        request, promptAsync
    }
}