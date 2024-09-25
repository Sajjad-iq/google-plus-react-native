import { useState, useEffect } from 'react';
import { backend } from '@env';
import Alerts from '@/components/others/alerts';
import useJWTToken from './useJWTToken';
import { router } from 'expo-router';
import { PostCommentType } from '@/types/comment';

interface FetchResponse {
    stop: boolean;
    comments: PostCommentType[];
}

// Define the hook function
export const usePostComments = (postId: string, limit: number, reloadPost: () => void) => {
    const [comments, setComments] = useState<PostCommentType[]>([]); // Store fetched comments
    const [commentContent, setCommentContent] = useState<string>(''); // Store the content of the comment
    const [isAddingComments, setIsAddingComments] = useState<boolean>(false); // Store loading state for adding comments
    const [stop, setStop] = useState<boolean>(false);
    const [isFetchingComments, setIsFetchingComments] = useState<boolean>(false); // Store loading state for fetching comments
    const { networkAlert, errorAlert, ExpiredSession } = Alerts();
    const { getJWTToken } = useJWTToken(); // Hook to get the JWT token

    // Function to add a comment
    const addComment = async () => {
        try {
            setIsAddingComments(true);
            const JWTToken = await getJWTToken(); // Retrieve JWT token for authorization

            if (commentContent == '') {
                errorAlert();
                return;
            }

            // API request to add a new comment for a post
            const response = await fetch(`${backend}/posts/${postId}/comment`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JWTToken}`,
                },
                body: JSON.stringify({
                    content: commentContent,
                }),
            });

            if (response.status === 401) {
                ExpiredSession();
                router.push("/login"); // Redirect to login if no user is found
                return;
            }

            if (!response.ok) {
                networkAlert(); // Handle network errors
                console.log(response.status);
                return;
            }

            setCommentContent(""); // Clear the input field
            reloadComments()
            reloadPost()
        } catch (err: any) {
            console.log(err.message); // Log the error
            errorAlert(); // Trigger error alert
        } finally {
            setIsAddingComments(false); // Stop loading state
        }
    };

    // Function to fetch comments
    const fetchComments = async () => {
        try {
            setIsFetchingComments(true);
            const JWTToken = await getJWTToken(); // Retrieve JWT token for authorization

            // API request to fetch comments for the post
            const response = await fetch(`${backend}/posts/comment/${postId}?limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${JWTToken}`,
                },
            });

            if (response.status === 401) {
                ExpiredSession();
                router.push("/login"); // Redirect to login if no user is found
                return;
            }

            if (!response.ok) {
                networkAlert(); // Handle network errors
                return;
            }

            const data: FetchResponse = await response.json();
            setComments(data.comments); // Set the fetched comments
            setStop(data.stop)
        } catch (err: any) {
            console.log(err.message); // Log the error
            errorAlert(); // Trigger error alert
        } finally {
            setIsFetchingComments(false); // Stop loading state
        }
    };

    // Reload comments
    const reloadComments = () => {
        fetchComments(); // Call fetchComments to reload
    };

    return {
        comments,
        setCommentContent,
        addComment,
        commentContent,
        isFetchingComments,
        isAddingComments,
        reloadComments, // Expose the reload function
        fetchComments,
        stop, setStop
    };
};
