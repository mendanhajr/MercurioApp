import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
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

    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        async function initOneSignal() {
            /* O N E S I G N A L   S E T U P */
            OneSignal.setLogLevel(6, 0);
            OneSignal.setAppId("998631a9-bde2-4eba-bba3-c62b828a2077");

            OneSignal.promptForPushNotificationsWithUserResponse(response => {
                console.log("Prompt response:", response);
            });
            OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
                console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
                let notification = notificationReceivedEvent.getNotification();
                console.log("notification: ", notification);
                const data = notification.additionalData
                console.log("additionalData: ", data);
                const button1 = {
                    text: "Cancel",
                    onPress: () => { notificationReceivedEvent.complete(); },
                    style: "cancel"
                };
                const button2 = { text: "Complete", onPress: () => { notificationReceivedEvent.complete(notification); }};
                Alert.alert("Complete notification?", "Test", [ button1, button2], { cancelable: true });
            });

            OneSignal.setNotificationOpenedHandler(notification => {
                console.log("OneSignal: notification opened:", notification);
            });
            const deviceState = await OneSignal.getDeviceState();

            setIsSubscribed(deviceState.isSubscribed);
        }
        initOneSignal();
    }, [])

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
