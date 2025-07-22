export interface User {
    name: string;
    mail: string;
    country: string;
    profile_pic: UserImage;
}

export interface UserImage {
    height: number;
    url: string;
    width: number;
}
