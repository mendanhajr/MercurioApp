import api from './api';

export async function Signin(emailUser, passwordUser) {
    try {
        const response = await api.post('login', {
            email: emailUser,
            password: passwordUser
        })
        return response.data;
    } catch (error) {

    }
}
