import { Stack } from "expo-router";
import '../i18n';
import React, { useEffect } from "react";
import useUserCredentials from "@/hooks/useUserCredentials";


export default function LayoutComponent() {

    const { checkStoredCredentials } = useUserCredentials()
    useEffect(() => {
        checkStoredCredentials()
    }, [])

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
