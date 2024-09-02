import { Stack } from "expo-router";
import '../i18n';
import React, { useEffect } from "react";
import useCheckUserCredentials from "@/hooks/useCheckUserCredentials";


export default function LayoutComponent() {

    const checkUserCredentials = useCheckUserCredentials()
    useEffect(() => {
        checkUserCredentials();
    }, []);


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
