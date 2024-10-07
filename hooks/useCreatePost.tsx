import { useState } from "react";
import { useGlobalData } from "@/context/GlobalContext";
import Alerts from "@/components/others/alerts";
import useJWTToken from "./useJWTToken";

interface Props {
    closeModal: () => void;
    resetImage: () => void;
    image: string;
    postsReloadCallback: () => void;
}

export function useCreatePost(props: Props) {
    const [postBody, setPostBody] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { userInfo } = useGlobalData();
    const { networkAlert, errorAlert, emptyPostAlert } = Alerts()
    const { getJWTToken } = useJWTToken()
    const backend = process.env.EXPO_PUBLIC_BACKEND;

    const handleInputChange = (text: string) => {
        setPostBody(text);
    };

    const submitPost = async () => {
        if (!postBody.trim() && !props.image) {
            console.log("Post cannot be empty");
            emptyPostAlert()
            return;
        }

        const formData = new FormData();
        formData.append("body", postBody);
        formData.append("author_id", userInfo.id);
        formData.append("author_avatar", userInfo.profile_avatar || "");
        formData.append("author_name", userInfo.username);
        formData.append("share_state", "Public");

        if (props.image) {
            formData.append("image_url", {
                uri: props.image,
                name: "image.png",
                type: "image/jpg"
            } as any);  // Adjust filename if necessary
        }

        setIsSubmitting(true);

        const JWTToken = await getJWTToken()

        try {
            const response = await fetch(`${backend}/create-post  `, {
                method: "POST",
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${JWTToken}`
                },
                body: formData,
            });

            if (!response.ok) {
                networkAlert()
            }

            setPostBody("");
            props.closeModal();
            props.resetImage();  // Ensure image is reset
            props.postsReloadCallback();
        } catch (err: any) {
            console.log(err.message || "An unknown error occurred");
            errorAlert()
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        postBody,
        isSubmitting,
        handleInputChange,
        submitPost,
    };
}
