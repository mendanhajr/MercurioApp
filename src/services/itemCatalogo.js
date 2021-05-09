import api from './api';

export async function getItemCatalogo(objParams) {
    try {
        const response = await api.get('item-catalogo', objParams);
        return response.data;
    } catch (error) {
        console.log(error.response.status)
    }
}

export async function salvarItemCatalogo(objParams) {
    try {
        const response = await api.post('item-catalogo', objParams);
        return {response: response.data, success: true};
    } catch (error) {
        return {response: error.response.status, success: false};
    }
}