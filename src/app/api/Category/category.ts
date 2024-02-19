import requests from '../requests';

const CategoryAPI = {
    createCategory: (categoryName: string) =>
        requests.post('api/categories/create', categoryName),
    getAllCategories: () => requests.get('api/categories'),
};

export default CategoryAPI;
