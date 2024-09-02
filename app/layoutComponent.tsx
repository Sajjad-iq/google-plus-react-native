import { useGlobalData } from "@/context/GlobalContext";
import { router, Stack } from "expo-router";
import '../i18n';
import { UserInfo } from "@/types/user";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Ensure the auth session is completed for the WebBrowser
WebBrowser.maybeCompleteAuthSession();

export default function LayoutComponent() {
    const { setUserInfo } = useGlobalData();

    useEffect(() => {
        checkUserCredentials();
    }, []);


    const checkUserCredentials = async () => {
        const user = await getLocalUser();
        if (user) {
            checkJWT(user.accessToken)
            setUserInfo(user);
            console.log("loaded locally", user);
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

    const checkJWT = async (token: string) => {
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
                router.push("/(drawer)/");
            } else {
                await AsyncStorage.removeItem("@user");
                router.push("/login");
            }

        } catch (error) {
            console.error("Failed to fetch user info", error);
        }
    };


    return (
        <Stack>
            <Stack.Screen
                name="login" // Login screen
                options={{ headerShown: false }} // Hide the header
            />
            <Stack.Screen
                name="(drawer)" // Drawer screen
                options={{ headerShown: false }} // Hide the header
            />
        </Stack>
    );
}
