import { mentionedUserType } from "./user";

export interface PostCommentType {
    id: string;
    post_id: string;
    user_id: string;
    content: string;
    author_name: string;
    mentioned_users: mentionedUserType[];
    author_avatar: string;
    created_at: string;
    updated_at: string;
}
