import { create, useStore } from 'zustand';
import type { Role } from '../types/roles';
import { devtools, persist } from 'zustand/middleware';
import { z } from 'zod';
import { jwtDecode } from 'jwt-decode';
import AuthAPI from '../app/api/Account/Auth/auth';
import { useNavigate } from 'react-router-dom';

const TokenDataSchema = z.object({
    authorities: z.array(z.string()),
    sub: z.string(),
    // role: z.string(),
});

type TokenData = z.infer<typeof TokenDataSchema>;
interface User {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role?: Role | null;
    isLoggedIn: boolean;
}

export type AuthStore = {
    accessToken: string | undefined;
    accessTokenData: TokenData | undefined;
    refreshToken: string | undefined;
    user: User | null;

    actions: {
        setUser: (user: any) => void;
        setAccessToken: (accessToken: string | undefined) => void;
        setRefreshToken: (refreshToken: string | undefined) => void;
        // set tokens on the app start
        init: () => void;
        clearTokens: () => void;
        login: (values: { email: string; password: string }) => Promise<void>;
    };
};

export const decodeAccessToken = (accessToken: string): TokenData =>
    TokenDataSchema.parse(jwtDecode(accessToken));
// {
//     const payload = token.split('.')[1];
//     const decodedPayload = atob(payload);
//     return JSON.parse(decodedPayload);
// };

let AuthStore: any = (set: any, get: any) => ({
    accessToken: undefined,
    accessTokenData: undefined,
    refreshToken: undefined,
    user: null,

    actions: {
        setUser: (user: any) => set({ user }),
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
        setRefreshToken: (refreshToken: string | undefined) =>
            set({ refreshToken }),
        init: () => {
            const { setAccessToken, setRefreshToken } = get().actions;
            const accessToken = localStorage.getItem('ACCESS_TOKEN');
            const refreshToken = localStorage.getItem('REFRESH_TOKEN');
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
            set({ accessToken, refreshToken, accessTokenData });
        },
        clearTokens: () => {
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('REFRESH_TOKEN');
            set({ accessToken: undefined, refreshToken: undefined });
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
                set({ user: { isLoggedIn: true, email: values.email } });
                // setRefreshToken(refreshToken);
                localStorage.setItem('ACCESS_TOKEN', accessToken);
                // localStorage.setItem('REFRESH_TOKEN', refreshToken);
            } catch (error: any) {
                if (error.response && error.response.status === 403) {
                    console.log('Invalid credentials');
                } else {
                    console.log(error);
                }
            }
        },
    },
});

// authStore = devtools(persist(authStore, { name: 'auth-store' }));
// AuthStore = devtools(AuthStore);
// AuthStore = persist(AuthStore, { name: 'auth-store' });

export const useAuthStore = create<AuthStore>(AuthStore);

const actionsSelector = (state: any) => state.actions;

const accessTokenSelector = (state: AuthStore) => state.accessToken;
const accessTokenDataSelector = (state: AuthStore) => state.accessTokenData;
const refreshTokenSelector = (state: AuthStore) => state.refreshToken;
const userSelector = (state: AuthStore) => state.user;

export const getActions = () => actionsSelector(AuthStore.getState());

export const getAccessToken = () =>
    accessTokenSelector(useAuthStore.getState());
export const getAccessTokenData = () =>
    accessTokenDataSelector(useAuthStore.getState());
export const getRefreshToken = () =>
    refreshTokenSelector(useAuthStore.getState());
export const getUser = () => userSelector(useAuthStore.getState());

// const authStore = create<AuthStore>(AuthStore);

// export type ExtractState<S> = S extends {
//     getState: () => infer T;
// }
//     ? T
//     : never;

// type Params<U> = Parameters<typeof useStore<typeof authStore, U>>;

// // Selectors
// const accessTokenSelector = (state: ExtractState<typeof authStore>) =>
//     state.accessToken;
// const accessTokenDataSelector = (state: ExtractState<typeof authStore>) =>
//     state.accessTokenData;
// const refreshTokenSelector = (state: ExtractState<typeof authStore>) =>
//     state.refreshToken;
// const actionsSelector = (state: ExtractState<typeof authStore>) =>
//     state.actions;

// // getters
// export const getAccessToken = () => accessTokenSelector(authStore.getState());
// export const getAccessTokenData = () =>
//     accessTokenDataSelector(authStore.getState());
// export const getRefreshToken = () => refreshTokenSelector(authStore.getState());
// export const getActions = () => actionsSelector(authStore.getState());

// function useAuthStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
//     return useStore(authStore, selector, equalityFn);
// }

// // Hooks
// export const useAccessToken = () => useAuthStore(accessTokenSelector);
// export const useAccessTokenData = () => useAuthStore(accessTokenDataSelector);
// export const useRefreshToken = () => useAuthStore(refreshTokenSelector);
// export const useActions = () => useAuthStore(actionsSelector);
