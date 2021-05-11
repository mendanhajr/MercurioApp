import React, { useState, useEffect, useRef } from 'react';
import { withTheme, Text} from 'react-native-elements';
import { ListItem, Avatar } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import * as despesas from '../../services/despesas.js';
import {Animated, ScrollView, StyleSheet, Image, ActivityIndicator, View, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import image from './../../../assets/icon/loading_mercurio.png';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

const ListaDespesas = (props) => {

    const [arrDespesas, setArrDespesas] = useState([]);
    const [loadingDespesas, setLoadingDespesas] = useState(true);

    const { theme } = props;

    //const startValue = useRef(new Animated.Value(1)).current;
    const startValue = useRef(new Animated.Value(1))    ;
    //const startValue = new Animated.Value(1);
    const endValue = 1.5;

    const recuperarDespesas = () => {
        despesas.recuperarDespesas().then(response => {
            setArrDespesas(response);
            setLoadingDespesas(false);
        }).catch(error => {
            setLoadingDespesas(false);
        })
    }

    useEffect(() => {
        recuperarDespesas();
    }, [startValue, endValue])

    useFocusEffect(
        React.useCallback(() => {
            recuperarDespesas();
            Keyboard.dismiss();
        }, [])
    );

    const listarDespesas = () => {
        if (arrDespesas.length > 0) {
            return arrDespesas.map((despesa, index) => {
                return (
                    <ListItem
                        key={index}
                        bottomDivider
                        Component={TouchableScale}
                        friction={90} //
                        tension={100} // These props are passed to the parent component (here TouchableScale)
                        activeScale={0.95} //

                    >
                            <Icon
                                name={
                                    despesa.status === 'P'
                                        ? 'checkmark-outline'
                                        : despesa.status === 'A'
                                        ? 'alarm-outline'
                                        : ''
                                }
                                color={
                                    despesa.status === 'P'
                                        ? 'green'
                                        : despesa.status === 'A'
                                        ? 'red'
                                        : ''
                                }
                                raised
                                size={20}
                            />
                        <ListItem.Content>
                            <ListItem.Title>{`${despesa.nome_catalogo} - ${despesa.nome}`}</ListItem.Title>
                            <ListItem.Subtitle>{despesa.valor}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )
            })
        }else{
            /*return (
                <Image
                    source={require('./../../../assets/icon/loading_mercurio.png')}
                />
            )*/

            return (
                <View style={[styles.containerLoading, styles.horizontalLoading]}>
                    <Text
                        h3
                        h3Style={{
                            color: theme.colors.secondary
                        }}
                    >Nenhuma despesa encontrada</Text>
                </View>
            )
        }
    }

    if (loadingDespesas) {
        return (
            <View style={[styles.containerLoading, styles.horizontalLoading]}>
                <ActivityIndicator
                    size={100}
                    color={theme.colors.secondary}
                />
            </View>
        )
    }

    return(
        <ScrollView>
            {
                listarDespesas()
            }
        </ScrollView>
    )
}

export default withTheme(ListaDespesas);