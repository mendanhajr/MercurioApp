import React, {useState, useEffect} from 'react';
import {withTheme, Text} from 'react-native-elements';
import * as despesas from '../../services/despesas.js';
import {ActivityIndicator, View, Keyboard} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';
import {useFocusEffect} from '@react-navigation/native';
import {FlatList, SafeAreaView} from "react-native";
import {arrayAnos, arrayDatas, getObjIcon} from '../../utils/utils';

const ListaDespesas = (props) => {

    const [arrDespesas, setArrDespesas] = useState([]);
    const [loadingDespesas, setLoadingDespesas] = useState(true);

    const {theme} = props;

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
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            recuperarDespesas();
            Keyboard.dismiss();
        }, [])
    );

    const listarDespesas = (despesa, index) => {
        let objIcon = getObjIcon(despesa.nome_catalogo);
        return (
            <View
                key={index}
                style={{
                    display: "flex",
                    flexDirection: 'row',
                    marginTop: 7,
                    marginBottom: 7,
                    marginLeft: 15,
                    marginRight: 15,
                    elevation: 7,
                    backgroundColor: '#fff',
                    //backgroundColor: theme.colors.primary,
                }}
            >
                <View style={{flexGrow: 0}}>
                    <Icon
                        name={objIcon.name}
                        type={objIcon.type}
                        color={theme.colors.secondary}
                        size={28}
                        raised
                    />
                </View>
                <View style={{flexGrow: 1, padding: 5}}>
                    <Text style={{color: theme.colors.secondary}}>{`${despesa.nome}`}</Text>
                    <Text style={{fontSize: 12, color: 'gray'}}>
                        {`${arrayDatas()[despesa.mes_referencia]}/${arrayAnos()[despesa.ano_referencia]}`}
                    </Text>
                    <Text style={{fontSize: 12, color: 'gray'}}>{`${despesa.valor}`}</Text>
                </View>
                <View style={{flexGrow: 0, padding: 20}}>
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
                        type={'ionicon'}
                        size={30}
                    />
                </View>
            </View>
        )
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

    return (
        <FlatList
            data={arrDespesas}
            renderItem={({item, index}) => (
                listarDespesas(item, index)
            )}
            keyExtractor={item => item.id.toString()}
        />
    )
}

export default withTheme(ListaDespesas);