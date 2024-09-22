export interface PostType {
    id: string;  // UUID is represented as a string in TypeScript
    author_id?: string;
    author_name: string;
    author_avatar: string;
    body: string;
    image_url?: string;
    share_state: "Public" | "Private";
    likes_count: number;
    comments_count: number;
    hashtags?: string[];  // pq.StringArray is represented as an array of strings
    mentioned_users?: number[];  // pq.Int32Array is represented as an array of numbers
    created_at: string;  // time.Time is typically serialized as an ISO string
    updated_at: string;
}
