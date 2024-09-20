import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleUserInfo, UserInfo } from '@/types/user';
import { useGlobalData } from '@/context/GlobalContext';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { androidClientId, iosClientId, webClientId, backend } from '@env';
import Alerts from '@/components/others/alerts';

WebBrowser.maybeCompleteAuthSession();

export default function useUserCredentials() {
    const [token, setToken] = useState<string | null>(null);
    const { setUserInfo, userInfo } = useGlobalData();
    const { networkAlert, errorAlert } = Alerts()

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
        }
    }, [token]);

    // Check if user token exists in AsyncStorage and validate
    const checkStoredCredentials = async () => {
        try {
            const storedToken = await AsyncStorage.getItem("@token");
            if (storedToken) {
                const googleUser = await getUserFromGoogle(storedToken);

                if (googleUser) {
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
        }
    };


    const setLocalUser = async () => {
        const user = await AsyncStorage.getItem("@user");
        if (user) {
            try {
                const parsedUser = JSON.parse(user); // Parse the string to a JavaScript object
                setUserInfo(parsedUser); // Ensure parsedUser matches the UserInfo type
            } catch (error) {
                router.push("/login"); // Redirect to login if parsing fails
            }
        } else {
            router.push("/login"); // Redirect to login if no user is found
        }
    };


    // Verify JWT with Google API
    const getUserFromGoogle = async (token: string): Promise<GoogleUserInfo | null> => {
        try {
            const userData = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!userData.ok) {
                console.error("Failed to verify JWT");
                router.push("/login");
                return null;
            }

            return (await userData.json()) as GoogleUserInfo;
        } catch (error) {
            console.error("Error fetching Google user info", error);
            await setLocalUser()
            networkAlert()
            return null
        }
    };

    // Fetch Google user info or register with the backend
    const getUserInfo = async (accessToken: string) => {
        try {
            const googleUser = await getUserFromGoogle(accessToken);
            await AsyncStorage.setItem("@token", accessToken);

            if (googleUser) {
                const backendUserData = await registerOrUpdateUser(googleUser);
                if (backendUserData) {
                    await AsyncStorage.setItem("@user", JSON.stringify(backendUserData));
                    setUserInfo(backendUserData);
                    router.push("/(drawer)/");
                }
            }

        } catch (error) {
            errorAlert()
            console.error("Error fetching Google user info:", error);
        }
    };

    // Register or update user with backend
    const registerOrUpdateUser = async (user: GoogleUserInfo): Promise<UserInfo | null> => {
        try {
            const userData = await fetch(`${backend}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: user.id,
                    username: user.name,
                    email: user.email,
                    profile_avatar: user.picture,
                }),
            });

            if (!userData.ok) {
                console.error("Failed to get user");
                return null;
            }

            const parsedData = await userData.json();  // Parse JSON once
            return parsedData;  // Return the parsed data
        } catch (error) {
            console.error("Error registering user with backend:", error);
            networkAlert();
            setLocalUser();
            return null;
        }
    };

    return {
        request,
        promptAsync,
        checkStoredCredentials,
        userInfo,
    };
}
