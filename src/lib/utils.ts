import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuthStore, AuthStore } from '../stores/AuthStore';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export interface Term {
    id: number;
    name: string;
}
export interface Option {
    label: string;
    value: string | number;
}

export const convertTermToOptions = (terms: Term[]): Option[] => {
    return terms.map((term) => ({
        label: term.name || term.name,
        value: term.id,
    }));
};

export const checkAuthRole = (roles: string[]) => {
    // const { isLoggedIn, role: userRole } = useAuthStore((state: AuthStore) => ({
    //     isLoggedIn: state.user?.isLoggedIn ?? false,
    //     role: state.user?.role,
    // }));
    // if (!isLoggedIn) return false;
    // return roles.includes(userRole as string);
    const token = JSON.parse(localStorage.getItem('auth-store') || '{}');
    // console.log(token.state.user);
    const user = token.state.user;
    // console.log(user);
    return roles.includes(user.role);
};
