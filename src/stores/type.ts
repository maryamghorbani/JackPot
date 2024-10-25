export type Status = 'login' | 'logout' | 'register' | 'loading';

export type User = {
    id: number,
    email: string,
    name: string,
    birthDate: string,
    password: string,
    confirmPassword: string,
};

export type LoginRequest = {
    email: string,
    password: string,
    token: string,
    remember: boolean,
};

