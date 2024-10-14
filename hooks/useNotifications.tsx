import Alerts from '@/components/others/alerts';
import { Actor, NotificationType } from '@/types/notification'; // Ensure you have a Notification type defined
import { useState } from 'react';
import useJWTToken from './useJWTToken';
import { useGlobalData } from '@/context/GlobalContext';
import { router } from 'expo-router';

// Define the hook function
export const useNotifications = (limit: number = 10) => {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { networkAlert, errorAlert } = Alerts();
    const { getJWTToken } = useJWTToken();
    const { lang, selectedPost, setSelectedPost } = useGlobalData()
    const backend = process.env.EXPO_PUBLIC_BACKEND;

    const fetchNotifications = async () => {
        const JWTToken = await getJWTToken();

        try {
            setLoading(true);
            // Make an API request to fetch notifications
            const response = await fetch(`${backend}/notifications?limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${JWTToken}`,
                    'Accept-Language': lang,  // Pass the lang variable in the header
                },
            });

            if (!response.ok) {
                networkAlert();
                throw new Error(`Error fetching notifications: ${response.status}`);
            }

            const data = await response.json();
            setNotifications(data.notifications);
        } catch (err: any) {
            console.log(err.message);
            errorAlert();
        } finally {
            setLoading(false);
        }
    };


    const markNotificationsAsRead = async (id: string) => {
        const JWTToken = await getJWTToken();

        try {
            // Make an API request to fetch notifications
            const response = await fetch(`${backend}/notifications/read/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${JWTToken}`,
                },
            });

            if (!response.ok) {
                networkAlert();
                throw new Error(`Error fetching notifications: ${response.status}`);
            }

        } catch (err: any) {
            console.log(err.message);
            errorAlert();
        } finally {
            setLoading(false);
        }
    };

    // New function to extract actor names
    const getActorNames = (actors: Actor[]): string => {
        return actors.map(actor => actor.name).join(', ');
    };

    const readTheNotification = async (notification: NotificationType) => {
        let post = { ...selectedPost }
        const id = notification.reference_id;
        post.id = id
        // Check what data was passed (e.g., postId)
        setSelectedPost(post)
        markNotificationsAsRead(notification.id)
        router.push("/(stack)/postView")
    };




    return { notifications, loading, fetchNotifications, getActorNames, readTheNotification };
};
