import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AuthContext from '../../contexts/auth';
import Despesas from './../Despesas/Despesas';
import Catalogo from './../Catalogo/Catalogo';
import ListaDespesas from './../Despesas/ListaDespesas';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {withTheme, Header, Text} from 'react-native-elements';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

function Dashboard(props) {

    const {user, signOut} = useContext(AuthContext);
    const {theme} = props;


    function handleSignout() {
        signOut();
    }

    const BtnSignOut = () => {
        return (
            <Icon
                type={'font-awesome-5'}
                name={'sign-out-alt'}
                onPress={() => handleSignout()}
                color={theme.colors.secondary}
                size={20}
                containerStyle={{marginTop: 2}}
            />
        )
    }

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
                rightComponent={<BtnSignOut />}
            />
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName, Icon;

                        if (route.name === 'Despesas') {
                            //iconName = 'shopping-basket';
                            iconName = 'cash-register';
                            Icon = FontAwesome5;
                        } else if (route.name === 'Catalogo') {
                            iconName = 'list';
                            Icon = FontAwesome;
                        } else if(route.name === 'ListaDespesas'){
                            iconName = focused ? 'clipboard-list' : 'clipboard-list';
                            Icon = FontAwesome5;
                        }

                        // You can return any component that you like here!
                        return (
                            <Icon
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
                <Tab.Screen
                    name="Despesas"
                    component={Despesas}
                    options={{
                        tabBarLabel: 'Registro',
                    }}
                />
                <Tab.Screen
                    name="Catalogo"
                    component={Catalogo}
                />
                <Tab.Screen
                    name="ListaDespesas"
                    component={ListaDespesas}
                    options={{
                        tabBarLabel: 'Lista de despesa',
                    }}
                />
            </Tab.Navigator>
        </>
    )
        ;
}

export default withTheme(Dashboard);
