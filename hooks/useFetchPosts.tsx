import { useState, useEffect, useCallback } from 'react';
import Alerts from '@/components/others/alerts';
import { PostType } from '@/types/post';

export const useFetchPosts = (url: string) => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reloadTrigger, setReloadTrigger] = useState<boolean>(false);
    const { networkAlert, errorAlert, NoPostsAlert } = Alerts();

    const fetchPosts = async () => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await fetch(url);
            if (!response.ok) {
                networkAlert();
            }
            const data: PostType[] = await response.json();

            if (data.length === 0) {
                NoPostsAlert(); // Alert when there are no posts
            } else {
                setPosts(data);
            }
        } catch (err: any) {
            errorAlert();
            console.log(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [url, reloadTrigger]); // Re-fetch posts whenever `url` or `reloadTrigger` changes

    // Function to trigger a reload
    const reload = useCallback(() => {
        setReloadTrigger((prev) => !prev); // Toggle the reload trigger to force re-fetch
    }, []);

    return { posts, loading, error, reload, setPosts };
};
