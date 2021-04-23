import api from './api';

export async function salvarDespesa(objParams) {
    try {
        const response = await api.post('despesas', objParams);
        return {response: response.data, success: true};
    } catch (error) {
        console.log(error.response.getMessage())
        return {response: error.response.status, success: false};
    }
}