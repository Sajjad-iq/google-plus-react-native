import { useState, useCallback } from 'react';
import Alerts from '@/components/others/alerts';
import { PostType } from '@/types/post';
import useJWTToken from './useJWTToken';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

interface FetchResponse {
    stop: boolean;
    posts: PostType[];
}
export const useFetchPosts = (url: string) => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [stop, setStop] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reloadTrigger, setReloadTrigger] = useState<boolean>(false);
    const { networkAlert, errorAlert, NoPostsAlert } = Alerts();
    const { getJWTToken } = useJWTToken()

    const fetchPosts = async () => {
        setLoading(true);
        setError(null); // Clear previous errors
        const JWTToken = await getJWTToken()
        try {
            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${JWTToken} ` }
            });
            if (!response.ok) {
                networkAlert();
            }
            const data: FetchResponse = await response.json();
            setPosts(data.posts);
            setStop(data.stop);

        } catch (err: any) {
            errorAlert();
            console.log(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchPosts();
            setStop(false)
        }, [url, reloadTrigger])
    );
    // Function to trigger a reload
    const reload = useCallback(() => {
        setReloadTrigger((prev) => !prev); // Toggle the reload trigger to force re-fetch
    }, []);

    return { posts, loading, error, reload, setPosts, stop };
};
