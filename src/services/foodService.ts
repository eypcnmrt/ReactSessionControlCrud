import api from './axios';

export const getFoodList = async (limit: number, skip: number) => {
  try {
    const response = await api.get(`/recipes?limit=${limit}&skip=${skip}`);
    return response.data;
  } catch (error) {
    console.error('Yemek listesi alınırken hata oluştu:', error);
    throw error;
  }
};

export const getFoodDetail = async (id: string) => {
  try {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Yemek detayı alınırken hata oluştu:', error);
    throw error;
  }
};

export const searchFoodList = async (searchTerm: string) => {
  try {
    const response = await api.get(`/recipes/search`, {
      params: { q: searchTerm },
    });
    return response.data;
  } catch (error) {
    console.error('Yemek arama sırasında hata oluştu:', error);
    throw error;
  }
};
