import {
    StopwatchIcon,
    CircleIcon,
    CrossCircledIcon,
    CheckCircledIcon,
} from '@radix-ui/react-icons';

export const statuses = [
    {
        value: 'NEW',
        label: 'Нове',
        icon: CircleIcon,
    },
    {
        value: 'BEING_PROCESSED',
        label: 'Опрацьовується',
        icon: StopwatchIcon,
    },
    {
        value: 'APPROVED',
        label: 'Cхвалено',
        icon: CheckCircledIcon,
    },
    {
        value: 'REJECTED',
        label: 'Відхилено',
        icon: CrossCircledIcon,
    },
];

export const categories = [
    {
        id: 3,
        categoryName: 'School/Style',
    },
    {
        id: 2,
        categoryName: 'Ornaments',
    },
    {
        id: 5,
        categoryName: 'Ware',
    },
    {
        id: 1,
        categoryName: 'Inscriptions',
    },
    {
        id: 4,
        categoryName: 'Previous Owners',
    },
    {
        id: 6,
        categoryName: 'Technique',
    },
    {
        id: 7,
        categoryName: 'Золото',
    },
    {
        id: 8,
        categoryName: 'Medieval Artifacts',
    },
    {
        id: 9,
        categoryName: 'Renaissance Artifacts',
    },
    {
        id: 10,
        categoryName: 'Ancient Artifacts',
    },
];
