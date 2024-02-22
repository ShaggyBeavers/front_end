import create from 'zustand';
import type { Role } from '../types/roles.d.ts';

type TokenData = {};

type AuthStore = {
    accessToken: string | undefined;
    accessTokenData: TokenData | undefined;
    refreshToken: string | undefined;

    actions: {
        setAccessToken: (accessToken: string | undefined) => void;
        setRefreshToken: (refreshToken: string | undefined) => void;
        // set tokens on the app start
        init: () => void;
        clearTokens: () => void;
    };
};

interface User {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: Role | null;
    isLoggedIn: boolean;
}

const useAuthStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));
