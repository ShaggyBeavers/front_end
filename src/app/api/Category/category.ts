import requests from '../requests';
import { authAPi } from '../requests';

const CategoryAPI = {
    createCategory: (categoryName: string) =>
        authAPi.post('api/categories/create', categoryName),
    deleteCategory: (categoryId: number) =>
        requests.delete(`api/categories/${categoryId}`),
    getAllCategories: () => requests.get('api/categories'),
};

export default CategoryAPI;
