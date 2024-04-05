import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuthStore, AuthStore } from '../stores/AuthStore';
import JSZip from 'jszip';

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
    const user = token.state.user;
    return roles.includes(user.role);
};

export const unzipFile = async (zipFile: any) => {
    try {
        const new_zip = new JSZip();
        const images: any = await new_zip
            .loadAsync(zipFile)
            .then((zip) => {
                let promises = Object.keys(zip.files).map(async (fileName) => {
                    const file = zip.files[fileName];
                    const data = await file.async('blob');
                    return { name: fileName, data };
                });
                return Promise.all(promises);
            })
            .then((files) => {
                // console.log('files', files);
                return files.reduce((acc, file) => {
                    acc[file.name] = file.data;
                    return acc;
                }, {} as any);
                // return files;
            });
        console.log('images', images);
        return images;
    } catch (error) {
        console.error('Error unzipping file:', error);
        return [];
    }
};
