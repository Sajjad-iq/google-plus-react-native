export interface Actor {
    id: string;
    name: string;
    avatar: string;
}

export interface NotificationType {
    id: string;
    userID: string;
    actors: Actor[];
    actionType: string;
    referenceID: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
}