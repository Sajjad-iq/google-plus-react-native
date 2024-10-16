import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import Constants from "expo-constants";

import { Platform } from "react-native";
import { ExpoPushToken } from "expo-notifications";
import useJWTToken from "./useJWTToken";
import { useGlobalData } from "@/context/GlobalContext";
import { router } from "expo-router";

export interface PushNotificationState {
    expoPushToken?: Notifications.ExpoPushToken;
    notification?: Notifications.Notification;
    updateBackendUserPushToken: (token: ExpoPushToken) => void;
}

export const usePushNotifications = (): PushNotificationState => {

    const backend = process.env.EXPO_PUBLIC_BACKEND;
    const { getJWTToken } = useJWTToken(); // Hook to get the JWT token
    const { setSelectedPost, selectedPost, lang } = useGlobalData()

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldShowAlert: true,
            shouldSetBadge: true,
        }),
    });

    const [expoPushToken, setExpoPushToken] = useState<
        Notifications.ExpoPushToken | undefined
    >();

    const [notification, setNotification] = useState<
        Notifications.Notification | undefined
    >();

    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Failed to get push token for push notification");
                return;
            }

            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas.projectId,
            });
        } else {
            alert("Must be using a physical device for Push notifications");
        }

        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }

        return token;
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            setExpoPushToken(token);
        });

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
                goToTheDestination(response)
            });

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current!
            );

            Notifications.removeNotificationSubscription(responseListener.current!);
        };
    }, []);



    const updateBackendUserPushToken = async (expoPushToken: ExpoPushToken) => {

        const JWTToken = await getJWTToken(); // Retrieve JWT token for authorization

        try {
            const response = await fetch(backend + `/push-token`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JWTToken}`,
                },
                body: JSON.stringify({
                    push_token: expoPushToken.data,
                    user_lang: lang
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'Failed to update push token');
            }

            console.log('Push token updated successfully!');
        } catch (error: any) {
            console.error('Error updating push token:', error.message);
        }
    };


    const goToTheDestination = async (response: Notifications.NotificationResponse) => {
        let post = { ...selectedPost }
        const id = response.notification.request.content.data.reference_id;
        post.id = id
        // Check what data was passed (e.g., postId)
        setSelectedPost(post)
        router.push("/(stack)/postView")
    };
    return {
        expoPushToken,
        notification,
        updateBackendUserPushToken
    };
};
