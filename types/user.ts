export interface UserInfo {
    id: string;
    username: string;
    email: string;
    profile_avatar?: string;
    profile_cover?: string;
    bio?: string;
    status?: string
    role?: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface GoogleUserInfo {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}


export interface mentionedUserType {
    user_id: string;
    user_name: string;
}