import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleUserInfo, UserInfo } from '@/types/user';
import { useGlobalData } from '@/context/GlobalContext';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { androidClientId, iosClientId, webClientId, backend } from '@env';

WebBrowser.maybeCompleteAuthSession();

export default function useUserCredentials() {
    const [token, setToken] = useState<string | null>(null);
    const { setUserInfo, userInfo } = useGlobalData();

    // Google Auth request
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: androidClientId,
        iosClientId: iosClientId,
        webClientId: webClientId,
    });

    // Check for Google access token on response success
    useEffect(() => {
        if (response?.type === "success" && response.authentication?.accessToken) {
            setToken(response.authentication.accessToken);
        }
    }, [response]);

    // Fetch Google user info if token is set
    useEffect(() => {
        if (token) {
            getUserInfo(token);
        } else {
            checkStoredCredentials();
        }
    }, [token]);

    // Check if user token exists in AsyncStorage and validate
    const checkStoredCredentials = async () => {
        try {
            const storedToken = await AsyncStorage.getItem("@token");
            if (storedToken) {
                const googleUser = await checkJWT(storedToken);
                if (googleUser?.name) {
                    const backendUserData = await registerOrUpdateUser(googleUser);
                    if (backendUserData) {
                        setUserInfo(backendUserData);
                        await AsyncStorage.setItem("@user", JSON.stringify(backendUserData));
                        router.push("/(drawer)/");
                    }
                }
            } else {
                router.push("/login");
            }
        } catch (error) {
            console.error("Error checking stored credentials", error);
            router.push("/login");
        }
    };

    // Verify JWT with Google API
    const checkJWT = async (token: string): Promise<GoogleUserInfo> => {
        try {
            const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                console.error("Failed to verify JWT");
                return {} as GoogleUserInfo;
            }

            return (await response.json()) as GoogleUserInfo;
        } catch (error) {
            console.error("Error fetching Google user info", error);
            return {} as GoogleUserInfo;
        }
    };

    // Fetch Google user info or register with the backend
    const getUserInfo = async (accessToken: string) => {
        try {
            const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch Google user info");
            }

            const googleUser = (await response.json()) as GoogleUserInfo;
            await AsyncStorage.setItem("@token", accessToken);

            if (googleUser.name) {
                const backendUserData = await registerOrUpdateUser(googleUser);
                if (backendUserData) {
                    await AsyncStorage.setItem("@user", JSON.stringify(backendUserData));
                    setUserInfo(backendUserData);
                    router.push("/(drawer)/");
                } else {
                    console.error("Backend user data not found");
                }
            }

        } catch (error) {
            console.error("Error fetching Google user info:", error);
        }
    };

    // Register or update user with backend
    const registerOrUpdateUser = async (user: GoogleUserInfo): Promise<UserInfo> => {
        try {
            const response = await fetch(`${backend}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: user.id,
                    username: user.name,
                    email: user.email,
                    profileAvatar: user.picture,
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
        checkStoredCredentials,
        userInfo,
    };
}
