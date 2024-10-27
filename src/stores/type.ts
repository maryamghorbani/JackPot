export type Status = 'login' | 'logout' | 'register' | 'loading';

export type User = {
    email: string,
    name: string,
    birthdate: string,
    totp_device?: string,
};

export type RegisterRequest = {
    email: string,
    name: string,
    birthdate: string
    password: string,
};

export type LoggedUser = {
    token: Record<string, string>,
    user: User,
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

export type PlayData = {
    play: {
        slot_machine: {
            name: string,
            jackpot: number,
        },
        result: string[],
        won: boolean,
        played_at: string,
    },
    balance: number,
};

