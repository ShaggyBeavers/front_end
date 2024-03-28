import { ExtFile } from '@files-ui/core';
import { atom } from 'jotai';

const filesAtom = atom<ExtFile[]>([]);
export { filesAtom };

const selectedPropertiesAtom = atom<string[]>([]);

export { selectedPropertiesAtom };
