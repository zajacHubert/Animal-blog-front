export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    img: string | null;
}

export interface UserToRegister {
    username: string;
    email: string;
    password: string;
}

export interface UserToLogin {
    username: string;
    password: string;
}

export interface CurrentUser {
    id: number;
    username: string;
    email: string;
}