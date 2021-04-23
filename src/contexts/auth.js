import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import * as auth from '../services/auth';
import api from '../services/api';

const AuthContext = createContext({ signed: false, user: {} });

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@RNAuth:user');
            const storageToken = await AsyncStorage.getItem('@RNAuth:token');

            if (storageUser && storageToken) {
                api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;
                api.defaults.headers['Accept'] = 'application/json';
                api.defaults.headers['Content-Type'] = 'application/json';

                setUser(JSON.parse(storageUser));
                setLoading(false);
            } else if (!storageUser && !storageToken) {
                setLoading(false);
            }
        }

        loadStorageData();
    }, [])

    async function signIn(emailUser, passwordUser) {
       try{
           const response = await auth.Signin(emailUser,  passwordUser)
           setUser(response.user)

           api.defaults.headers['Authorization'] = `Bearer ${response.token}`;
           api.defaults.headers['Accept'] = 'application/json';
           api.defaults.headers['Content-Type'] = 'application/json';

           await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
           await AsyncStorage.setItem('@RNAuth:token', response.token);
       }catch (error) {
           console.log(error)
       }
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    return (
        <AuthContext.Provider value={{ signed: !! user, user, signIn, signOut, loading }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
