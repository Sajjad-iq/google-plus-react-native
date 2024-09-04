import { useState } from "react";
import { backend } from '@env';
import { useGlobalData } from "@/context/GlobalContext";

interface Props {
    resetImage: () => void;
    image: Blob;
}

export function useCreatePost(props: Props) {
    const [postBody, setPostBody] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { userInfo } = useGlobalData();

    const handleInputChange = (text: string) => {
        setPostBody(text);
    };

    const submitPost = async () => {
        if (!postBody.trim() && !props.image) {
            console.log("Post cannot be empty");
            return;
        }

        const formData = new FormData();
        formData.append("body", postBody);
        formData.append("author_id", userInfo.id);
        formData.append("author_avatar", userInfo.profile_avatar || "");
        formData.append("author_name", userInfo.username);
        formData.append("share_state", "Public");
        formData.append("image_url", props.image);  // Adjust filename if necessary


        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`${backend}/create-post`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to create post");
            }

            const result = await response.json();
            setPostBody("");
            props.resetImage();  // Ensure image is reset
        } catch (err: any) {
            console.log(err.message || "An unknown error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        postBody,
        isSubmitting,
        error,
        handleInputChange,
        submitPost,
    };
}
