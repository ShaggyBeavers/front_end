import { create } from 'zustand';
import type { Role } from '../types/roles';
import { devtools, persist } from 'zustand/middleware';
import { z } from 'zod';
import { jwtDecode } from 'jwt-decode';
import AuthAPI from '../app/api/Account/Auth/auth';

const TokenDataSchema = z.object({
    authorities: z.array(z.string()),
    sub: z.string(),
    id: z.string(),
});

type TokenData = z.infer<typeof TokenDataSchema>;
interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role?: Role;
    isLoggedIn: boolean;
}

export type AuthStore = {
    accessToken: string | undefined;
    accessTokenData: TokenData | undefined;
    refreshToken: string | undefined;
    user: User;

    setAccessToken: (accessToken: string | undefined) => void;
    setUser: (user: any) => void;
    setRefreshToken: (refreshToken: string | undefined) => void;
    clearTokens: () => void;
    login: (values: { email: string; password: string }) => Promise<void>;
};

export const decodeAccessToken = (accessToken: string): TokenData =>
    TokenDataSchema.parse(jwtDecode(accessToken));
// {
//     const payload = token.split('.')[1];
//     const decodedPayload = atob(payload);
//     return JSON.parse(decodedPayload);
// };

export const useAuthStore = create(
    devtools(
        persist(
            (set: any, get: any) => ({
                accessToken: '',
                accessTokenData: undefined,
                refreshToken: undefined,
                user: {} as User,

                setAccessToken: (accessToken: string | undefined) => {
                    const accessTokenData = (() => {
                        try {
                            return accessToken
                                ? decodeAccessToken(accessToken)
                                : undefined;
                        } catch (e) {
                            console.error(e);
                            return undefined;
                        }
                    })();
                    set({ accessToken, accessTokenData });
                },
                setUser: (user: any) => set({ user }),
                setRefreshToken: (refreshToken: string | undefined) =>
                    set({ refreshToken }),
                clearTokens: () => {
                    localStorage.removeItem('ACCESS_TOKEN');
                    localStorage.removeItem('REFRESH_TOKEN');
                    set({
                        accessToken: undefined,
                        refreshToken: undefined,
                    });
                },
                login: async (values: { email: string; password: string }) => {
                    const { setAccessToken, setRefreshToken } = get().actions;
                    try {
                        const response = await AuthAPI.login(values);
                        const accessToken = response.data.accessToken;

                        // save values into user store
                        setAccessToken(accessToken);
                        console.log('accessToken', accessToken);
                        console.log('accessTokenData', get().accessTokenData);
                        set({
                            user: { isLoggedIn: true, email: values.email },
                        });
                        localStorage.setItem('ACCESS_TOKEN', accessToken);
                        // setRefreshToken(refreshToken);
                        // localStorage.setItem('REFRESH_TOKEN', refreshToken);
                    } catch (error: any) {
                        if (error.response && error.response.status === 403) {
                            console.log('Invalid credentials');
                        } else {
                            console.log(error);
                        }
                    }
                },
            }),
            { name: 'auth-store' }
        )
    )
);
