import requests ,{ authAPi }from '../requests';

const CategoryAPI = {
    createCategory: (value:{name: string}) =>
        authAPi.post('api/categories/create', value),
    deleteCategory: (categoryId: number) =>
        authAPi.delete(`api/categories/${categoryId}`),
    getCategories: () => requests.get('api/categories/'),
};

export default CategoryAPI;
