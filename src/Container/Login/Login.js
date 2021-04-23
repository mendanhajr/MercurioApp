import React,  {useContext, useState} from 'react';
import {Input, Text, Button, Icon} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import {withTheme} from 'react-native-elements';
import AuthContext from '../../contexts/auth';

 function Login(props)  {

     const { signed, signIn } = useContext(AuthContext);

     const [emailUser, setEmailUser] = useState('');
     const [passwordUser, setPasswordUser] = useState('');

     function handleSignIn(){
         signIn(emailUser, passwordUser);
     }

     const {theme} = props;
        return (
            <View style={[styles.container, {backgroundColor: theme.colors.primary}]}>
                <View style={styles.titleLogin}>
                    <Text
                        style={
                            {
                                fontFamily: "DalekPinpointBold",
                                fontSize: 50,
                                color: theme.colors.secondary
                            }
                        }
                    >
                        MERCURIO
                    </Text>
                </View>
                <View style={styles.itemLogin}>
                    <Input
                        placeholder='Usuário'
                        leftIcon={{type: 'font-awesome', name: 'user', color: theme.colors.secondary}}
                        value={emailUser}
                        onChangeText={(value) => setEmailUser(value)}
                    />
                </View>
                <View style={styles.itemLogin}>
                    <Input
                        placeholder='Senha'
                        leftIcon={{type: 'font-awesome', name: 'unlock-alt', color: theme.colors.secondary}}
                        value={passwordUser}
                        onChangeText={(value) => setPasswordUser((value))}
                    />
                </View>
                <View style={styles.itemLogin}>
                    <Button
                        title="ENTRAR"
                        raised
                        buttonStyle={{backgroundColor: theme.colors.secondary}}
                        onPress={handleSignIn}
                    />
                </View>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center', /* center items vertically, in this case */
        alignItems: 'center',
        height: '100%',
    },
    itemLogin: {
        width: '90%',
    },
    titleLogin: {
        height: '20%'
    }
})

export default withTheme(Login);