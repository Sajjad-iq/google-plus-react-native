import Alerts from '@/components/others/alerts';
import { Actor, NotificationType } from '@/types/notification'; // Ensure you have a Notification type defined
import { useState } from 'react';
import useJWTToken from './useJWTToken';
import { useGlobalData } from '@/context/GlobalContext';

// Define the hook function
export const useNotifications = (userID: string, limit: number = 10) => {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { networkAlert, errorAlert } = Alerts();
    const { getJWTToken } = useJWTToken();
    const { lang } = useGlobalData()
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


    // New function to extract actor names
    const getActorNames = (actors: Actor[]): string => {
        return actors.map(actor => actor.name).join(', ');
    };


    return { notifications, loading, fetchNotifications, getActorNames };
};
