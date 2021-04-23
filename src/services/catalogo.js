import api from './api';

export async function getCatalogo() {
    try {
        const response = await api.get('catalogo');
        return response.data;
    } catch (error) {
        console.log(error.response.status)
    }
}

export async function salvarCatalogo(objParams) {
    try {
        const response = await api.post('catalogo', objParams);
        return {response: response.data, success: true};
    } catch (error) {
        return {response: error.response.status, success: false};
    }
}