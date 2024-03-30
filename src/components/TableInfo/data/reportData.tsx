// import {
//     StopwatchIcon,
//     CircleIcon,
//     CrossCircledIcon,
//     CheckCircledIcon,
// } from '@radix-ui/react-icons';

import { Timer, CircleIcon, XCircle, CheckCircle2 } from 'lucide-react';
export const statuses = [
    {
        value: 'NEW',
        label: 'Нове',
        icon: CircleIcon,
        color: 'text-zinc-300',
    },
    {
        value: 'BEING_PROCESSED',
        label: 'Опрацьовується',
        // icon: StopwatchIcon,
        icon: Timer,
        color: 'text-yellow-400',
    },
    {
        value: 'APPROVED',
        label: 'Cхвалено',
        // icon: CheckCircledIcon,
        icon: CheckCircle2,
        color: 'text-green-500',
    },
    {
        value: 'REJECTED',
        label: 'Відхилено',
        // icon: CrossCircledIcon,
        icon: XCircle,
        color: 'text-red-500 ',
    },
];

export const categories = [
    {
        id: 3,
        name: 'School/Style',
    },
    {
        id: 2,
        name: 'Ornaments',
    },
    {
        id: 5,
        name: 'Ware',
    },
    {
        id: 1,
        name: 'Inscriptions',
    },
    {
        id: 4,
        name: 'Previous Owners',
    },
    {
        id: 6,
        name: 'Technique',
    },
    {
        id: 7,
        name: 'Золото',
    },
    {
        id: 8,
        name: 'Medieval Artifacts',
    },
    {
        id: 9,
        name: 'Renaissance Artifacts',
    },
    {
        id: 10,
        name: 'Ancient Artifacts',
    },
];
