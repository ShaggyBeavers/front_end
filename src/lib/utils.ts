import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export interface Term {
    id: number;
    categoryName: string;
    name: string;
}
export interface Option {
  label: string;
  value: string | number;
}

export const convertTermToOptions = (terms: Term[]): Option[] => {
  return terms.map((term) => ({
    label: term.categoryName || term.name,
    value: term.id,
  }));
};
