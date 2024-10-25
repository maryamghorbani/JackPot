export type Status = 'login' | 'logout' | 'register' | 'loading';

export type User = {
    email: string,
    name: string,
    birthdate: string,
    totp_device: string,
};

export type RegisterRequest = {
    email: string,
    name: string,
    birthdate: string
    password: string,
};

export type LoginRequest = {
    email: string,
    password: string,
    token: string,
};

export type ReturnedUser = {
    user: User,
    message: string,
};

