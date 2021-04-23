import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeProvider} from 'react-native-elements';
import {useFonts} from 'expo-font';
import {AuthProvider} from './src/contexts/auth'
import Routes from './src/routes';
import FlashMessage from "react-native-flash-message";

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
                    <FlashMessage position="top"/>
                </ThemeProvider>
            </AuthProvider>
        </NavigationContainer>
    );
}

export default App;
