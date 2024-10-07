import Alerts from '@/components/others/alerts';
import { PostType } from '@/types/post';
import { useState } from 'react';
import useJWTToken from './useJWTToken';


// Define the hook function
export const useFetchPostByID = (postId: string) => {
    const [post, setPost] = useState<PostType>({} as PostType);
    const [loading, setLoading] = useState<boolean>(false);
    const [touched, setTouched] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { networkAlert, errorAlert } = Alerts();
    const { getJWTToken } = useJWTToken()
    const backend = process.env.EXPO_PUBLIC_BACKEND;

    const fetchPost = async () => {
        const JWTToken = await getJWTToken()

        try {
            setLoading(true);
            setTouched(true)
            setError(null);

            // Make an API request to fetch the post by ID
            const response = await fetch(`${backend}/posts/${postId}  `, {
                headers: { Authorization: `Bearer ${JWTToken}` }
            });
            if (!response.ok) {
                networkAlert()
            }

            const data: PostType = await response.json();
            setPost(data);
        } catch (err: any) {
            setError(err.message);
            errorAlert();
        } finally {
            setLoading(false);
        }
    };

    return { post, loading, error, fetchPost, touched };
};
