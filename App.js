import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'react-native-elements';
import {useFonts} from 'expo-font';
import {AuthProvider} from './src/contexts/auth'
import Routes from './src/routes';
import FlashMessage from "react-native-flash-message";
import OneSignal from "react-native-onesignal";

const theme = {
    colors: {
        primary: '#ffe082',
        secondary: '#008000',
    }
}

const App = (props) => {
    const [loaded] = useFonts({
        DalekPinpointBold: require('./assets/fonts/DalekPinpointBold.ttf'),
    });
    if (!loaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <Routes/>
                    <FlashMessage position="center"/>
                </ThemeProvider>
            </AuthProvider>
        </NavigationContainer>
    );
}

export default App;
