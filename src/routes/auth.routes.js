import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './../Container/Login/Login';

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
    <AuthStack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
)

export default AuthRoutes;