import { useState, useEffect } from 'react';
import { useGlobalData } from '@/context/GlobalContext';
import useJWTToken from './useJWTToken';
import Alerts from '@/components/others/alerts';
import { router } from 'expo-router';
import { UserInfo } from '@/types/user';

const backend = process.env.EXPO_PUBLIC_BACKEND; // Backend URL
const DEBOUNCE_DELAY = 500; // Delay in ms (500ms in this case)

// Define the hook for searching users
export const useSearch = () => {
    const { networkAlert, errorAlert } = Alerts();
    const { getJWTToken } = useJWTToken();
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null); // Timeout reference
    const { searchUsers, setSearchUsers } = useGlobalData()

    // Function to set the search query and debounce it
    const handleSearchQueryChange = (query: string) => {

        // Clear previous debounce timeout
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        // Set a new timeout for debouncing
        const newTimeout = setTimeout(() => {
            if (query) {
                searchUser(query); // Make the search request after the delay
            }
        }, DEBOUNCE_DELAY);

        setDebounceTimeout(newTimeout);
    };

    // Search users by name
    const searchUser = async (query: string) => {
        const JWTToken = await getJWTToken(); // Get JWT token
        let getter = { ...searchUsers }

        try {
            // Make an API request to search users by name
            const response = await fetch(`${backend}/search?name=${query}`, {
                headers: {
                    Authorization: `Bearer ${JWTToken}`,
                },
            });

            if (!response.ok) {
                networkAlert()
                throw new Error(`Error searching users: ${response.status}`);
            }

            const data = await response.json();
            getter.users = data.users
            setSearchUsers(getter);

        } catch (err: any) {
            console.error(err);
            errorAlert()
        }
    };


    return { handleSearchQueryChange };
};
