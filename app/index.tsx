import { StyleSheet, View, Button, Image } from "react-native";
import useUserCredentials from "@/hooks/useUserCredentials";
import { useEffect } from "react";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export default function LoginScreen() {
    const { request, promptAsync, token } = useUserCredentials()
    const { expoPushToken, updateBackendUserPushToken } = usePushNotifications();

    useEffect(() => {
        if (expoPushToken) {
            updateBackendUserPushToken(expoPushToken)
        }
    }, [])

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
