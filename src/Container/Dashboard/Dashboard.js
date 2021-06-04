import React, {useContext} from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AuthContext from '../../contexts/auth';
import Despesas from './../Despesas/Despesas';
import Catalogo from './../Catalogo/Catalogo';
import ListaDespesas from './../Despesas/ListaDespesas';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {withTheme, Header, Text} from 'react-native-elements';
import { Icon } from 'react-native-elements';
import HeaderDefault from "../../Component/Header/HeaderDefault";

const Tab = createBottomTabNavigator();

function Dashboard(props) {

    //context de usuario logado
    const { user } = useContext(AuthContext);
    //theme
    const {theme} = props;

    return (
        <>
            <HeaderDefault />
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
