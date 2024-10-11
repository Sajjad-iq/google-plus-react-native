export interface Actor {
    id: string;
    name: string;
    avatar: string;
}

export interface NotificationType {
    id: string;
    user_id: string;
    actors: Actor[];
    action_type: string[];
    reference_id: string;
    notification_content: string;
    is_read: boolean;
    created_at: Date;
    updated_at: Date;
}