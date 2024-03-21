import requests from '../requests';
import { authAPi } from '../requests';

const CategoryAPI = {
    createCategory: (categoryName: string) =>
        authAPi.post('api/categories/create', categoryName),
    getCategories: () => requests.get('api/categories/'),
};

export default CategoryAPI;
