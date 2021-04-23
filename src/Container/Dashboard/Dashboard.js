import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AuthContext from '../../contexts/auth';
import Despesas from './../Despesas/Despesas';
import Catalogo from './../Catalogo/Catalogo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {withTheme, Header, Text} from 'react-native-elements';
import {View} from "react-native";

const Tab = createBottomTabNavigator();

function Dashboard(props) {

    const {user, signOut} = useContext(AuthContext);
    const {theme} = props;


    function handleSignout() {
        signOut();
    }

    /*useEffect(() => {
        handleSignout();
    });*/

    return (
        <>
            <Header
                placement="center"
                centerComponent={{text:
                        <Text
                            style={
                                {
                                    fontFamily: "DalekPinpointBold",
                                    fontSize: 15,
                                    color: theme.colors.secondary
                                }
                            }
                        >
                            MERCURIO
                        </Text>
                    , style: {color: theme.colors.secondary}}}
            />
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;

                        if (route.name === 'Despesas') {
                            iconName = focused
                                ? 'shopping-basket'
                                : 'shopping-basket';
                        } else if (route.name === 'Catalogo') {
                            iconName = focused ? 'list' : 'list';
                        }

                        // You can return any component that you like here!
                        return (
                            <FontAwesome
                                raised
                                name={iconName}
                                size={size}
                                color={focused ? theme.colors.secondary : 'gray'}
                                containerStyle={theme.colors.secondary}
                            />
                        )
                    },
                })}
                tabBarOptions={{
                    activeTintColor: theme.colors.secondary,
                    inactiveTintColor: 'gray',
                    style: {
                        backgroundColor: theme.colors.primary,
                    }
                }}
            >
                <Tab.Screen name="Despesas" component={Despesas}/>
                <Tab.Screen name="Catalogo" component={Catalogo}/>
            </Tab.Navigator>
        </>
    )
        ;
}

export default withTheme(Dashboard);
