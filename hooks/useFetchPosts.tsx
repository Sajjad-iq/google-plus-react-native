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
    const [reloadTrigger, setReloadTrigger] = useState<boolean>(false);
    const { networkAlert, errorAlert } = Alerts();
    const { getJWTToken } = useJWTToken()

    const fetchPosts = async () => {
        setLoading(true);
        const JWTToken = await getJWTToken()
        try {
            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${JWTToken} ` }
            });

            if (!response.ok) {
                networkAlert();
            }

            const data: FetchResponse = await response.json();
            if (data) {
                if (data.posts.length > 0) {
                    setPosts(data.posts);
                }
                setStop(data.stop);
            }

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

    return { posts, loading, reload, setPosts, stop };
};
