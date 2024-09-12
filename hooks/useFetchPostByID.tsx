import Alerts from '@/components/others/alerts';
import { useGlobalData } from '@/context/GlobalContext';
import { PostType } from '@/types/post';
import { backend } from '@env';
import { useState, useEffect } from 'react';

// Define the hook function
export const useFetchPostByID = (postId: string) => {
    const [post, setPost] = useState<PostType>({} as PostType);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { networkAlert, errorAlert } = Alerts();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                setError(null);

                // Make an API request to fetch the post by ID
                const response = await fetch(`${backend}/posts/${postId}`);
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

        fetchPost();
    }, []);

    return { post, loading, error };
};
