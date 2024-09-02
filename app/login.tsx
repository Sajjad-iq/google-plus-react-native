import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInfo } from "@/types/user";
import { useGlobalData } from "@/context/GlobalContext";
import { router } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

export default function App() {

    const [token, setToken] = useState<string | null>(null);
    const { setUserInfo } = useGlobalData()

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "405151643043-uc2ri8uossg0d3up8bkdnl6pvhfv0tle.apps.googleusercontent.com",
        iosClientId: "405151643043-q4qbotpb83d4c6kb0cm76ktgf8nm0sl1.apps.googleusercontent.com",
        webClientId: "405151643043-h2ekvbsd9nj850d0u1ttkbg1h301bfvk.apps.googleusercontent.com",
    });

    useEffect(() => {
        handleEffect();
    }, [response, token]);

    async function handleEffect() {
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
            router.push("/(drawer)/")
        } catch (error) {
            console.error("Failed to fetch user info", error);
        }
    };

    return (
        <View style={styles.container}>
            <Button
                title="Sign in with Google"
                disabled={!request}
                onPress={() => {
                    promptAsync();
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
    card: {
        borderWidth: 1,
        borderRadius: 15,
        padding: 15,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});
