import api from './api';

export async function getTipoDespesas() {
    try {
        const response = await api.get('tipo-despesa');
        return response.data;
    } catch (error) {
        console.log(error.response.status)
    }
}