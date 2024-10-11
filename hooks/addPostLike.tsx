import Alerts from '@/components/others/alerts';
import { useState } from 'react';
import useJWTToken from './useJWTToken';
import { router } from 'expo-router';
import { useGlobalData } from '@/context/GlobalContext';

// Define the interface for the post response
interface PostResponse {
    message: string;
    likes_count: number;
    liked: boolean;
}

// Define the hook function
export const useAddLike = (postId: string) => {

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likesCount, setLikesCount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [touched, setTouched] = useState<boolean>(false);
    const { networkAlert, errorAlert, ExpiredSession } = Alerts();
    const { getJWTToken } = useJWTToken()
    const backend = process.env.EXPO_PUBLIC_BACKEND;
    const { lang } = useGlobalData()

    const toggleLike = async () => {
        try {
            setTouched(true);
            setError(null);
            const JWTToken = await getJWTToken()

            // API request to toggle the like status for a post
            const response = await fetch(`${backend}/posts/${postId}/like  `, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${JWTToken}`,
                    'Accept-Language': lang,  // Pass the lang variable in the header
                },
            });


            if (response.status == 401) {
                console.error("Backend JWT token invalid");
                ExpiredSession()
                router.push("/"); // Redirect to login if no user is found
                return null;
            }

            if (!response.ok) {
                networkAlert();
            }

            const data: PostResponse = await response.json();

            // Update the state with the new like status and likes count
            setLikesCount(data.likes_count);
            setIsLiked(data.liked)
        } catch (err: any) {
            setError(err.message);
            errorAlert();
        }
    };

    return {
        isLiked,
        likesCount,
        error,
        touched,
        toggleLike,
    };
};
