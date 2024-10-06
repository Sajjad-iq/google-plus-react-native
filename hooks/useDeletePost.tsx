import Alerts from '@/components/others/alerts';
import { backend } from '@env';
import useJWTToken from './useJWTToken';
import { router } from 'expo-router';
import { PostType } from '@/types/post';
import { UserInfo } from '@/types/user';


// Define the hook function
export const useDeletePost = (post: PostType, user: UserInfo) => {

    const { networkAlert, errorAlert, ExpiredSession } = Alerts();
    const { getJWTToken } = useJWTToken()

    const deletePost = async () => {
        try {
            if (post.author_id !== user.id) {
                errorAlert();
                return
            }
            const JWTToken = await getJWTToken()

            // API request to toggle the like status for a post
            const response = await fetch(`${backend}/posts/${post.id}  `, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${JWTToken}`
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

            router.push("/(drawer)/");

        } catch (err: any) {
            console.log(err.message);
            errorAlert();
        }
    };

    return {
        deletePost
    };
};
