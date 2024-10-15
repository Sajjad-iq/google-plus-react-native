import { useState } from 'react';
import { useGlobalData } from '@/context/GlobalContext';
import useJWTToken from './useJWTToken';
import Alerts from '@/components/others/alerts';
import { router } from 'expo-router';


const backend = process.env.EXPO_PUBLIC_BACKEND; // Backend URL

// Define the hook
export const useUserAccount = () => {
    const [userLoading, setLoading] = useState<boolean>(false);
    const { networkAlert, errorAlert } = Alerts();
    const { getJWTToken } = useJWTToken();
    const { setSelectedUser, selectedUser } = useGlobalData()

    // Fetch user by ID
    const fetchUserAccount = async (userId: string | undefined) => {
        const JWTToken = await getJWTToken(); // Get JWT token

        try {
            setLoading(true);

            // Make an API request to fetch user by ID
            const response = await fetch(`${backend}/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${JWTToken}`,
                },
            });

            if (!response.ok) {
                networkAlert();
                throw new Error(`Error fetching user: ${response.status}`);
            }

            const data = await response.json();
            setSelectedUser(data.user); // Set the fetched user data

        } catch (err: any) {
            console.error(err.message);
            errorAlert(); // Handle errors
        } finally {
            setLoading(false);
        }
    };

    const selectUser = (id: string) => {
        let user = { ...selectedUser }
        user.id = id
        setSelectedUser(user)
        router.push("/(stack)/profilePreview")
    }

    return { userLoading, fetchUserAccount, selectUser };
};
