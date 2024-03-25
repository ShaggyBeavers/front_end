import requests ,{ authAPi }from '../requests';

const CategoryAPI = {
    createCategory: (categoryName: string) =>
        authAPi.post('api/categories/create', categoryName),
    deleteCategory: (categoryId: number) =>
        authAPi.delete(`api/categories/${categoryId}`),
    getCategories: () => requests.get('api/categories/'),
};

export default CategoryAPI;
