import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
