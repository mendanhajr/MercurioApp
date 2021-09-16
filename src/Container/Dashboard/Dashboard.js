import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AuthContext from '../../contexts/auth';
import Despesas from './../Despesas/Despesas';
import Catalogo from './../Catalogo/Catalogo';
import ListaDespesas from './../Despesas/ListaDespesas';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {withTheme, useTheme} from 'react-native-elements';
import { Icon } from 'react-native-elements';

const DespesaStack = createStackNavigator();
const CatalogoStack = createStackNavigator();
const ListaDespesaStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function handleSignout() {
    const { signOut } = useContext(AuthContext);
    signOut();
}

function optionsHeader(){
    const {theme} = useTheme();
    return(
        {
            headerTitle: 'TESTE',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.secondary,
            headerTitleStyle: {
                fontFamily: "DalekPinpointBold",
                height: 'auto'
            },
            headerRight: () => (
                <Icon
                    type={'font-awesome-5'}
                    name={'sign-out-alt'}
                    onPress={() => handleSignout()}
                    color={theme.colors.secondary}
                    size={20}
                    containerStyle={{marginTop: 2, marginRight: 10}}
                />
            ),
        }
    )
}

function DespesaStackScreen() {

    return (
        <DespesaStack.Navigator>
            <DespesaStack.Screen
                name="Despesas"
                component={Despesas}
                options={optionsHeader}
            />
        </DespesaStack.Navigator>
    );
}

function CatalogoStackScreen() {
    return (
        <CatalogoStack.Navigator>
            <CatalogoStack.Screen
                name="Catalogo"
                component={Catalogo}
                options={optionsHeader}
            />
        </CatalogoStack.Navigator>
    );
}

function ListaDespesaStackScreen() {
    return (
        <ListaDespesaStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <ListaDespesaStack.Screen
                name="ListaDespesas"
                component={ListaDespesas}
            />
        </ListaDespesaStack.Navigator>
    );
}

function Dashboard(props) {

    //context de usuario logado
    const { user } = useContext(AuthContext);
    //theme
    const {theme} = props;

    return (
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName, Icon;

                        if (route.name === 'Despesas') {
                            iconName = 'cash-register';
                            Icon = FontAwesome5;
                        } else if (route.name === 'Catalogo') {
                            iconName = 'list';
                            Icon = FontAwesome;
                        } else if(route.name === 'ListaDespesas'){
                            iconName = focused ? 'clipboard-list' : 'clipboard-list';
                            Icon = FontAwesome5;
                        }
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
                    component={DespesaStackScreen}
                    options={{
                        tabBarLabel: 'Registro',
                    }}
                />
                <Tab.Screen
                    name="Catalogo"
                    component={CatalogoStackScreen}
                />
                <Tab.Screen
                    name="ListaDespesas"
                    component={ListaDespesaStackScreen}
                    options={{
                        tabBarLabel: 'Lista de despesa',
                    }}
                />
            </Tab.Navigator>
    );
}

export default withTheme(Dashboard);