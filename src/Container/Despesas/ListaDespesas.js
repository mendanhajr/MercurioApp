import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, Keyboard, FlatList} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {withTheme, Text, Overlay, Icon, Button, ListItem} from 'react-native-elements';
import * as despesas from '../../services/despesas.js';
import FilterButton from '../../Component/FilterButton/FilterButton';
import {useFocusEffect} from '@react-navigation/native';
import {arrayDatas, arrayAnos, getObjIcon} from '../../utils/utils';
import styles from './styles';
import BoxAnoMes from "../../Component/BoxAnoMes/BoxAnoMes";

const anoAtual = new Date().getFullYear();
const mesAtual = new Date().getMonth();
const indexAnoAtual = arrayAnos().findIndex(ano => ano === anoAtual);

const ListaDespesas = (props) => {

    //state para o array de despesas;
    const [arrDespesas, setArrDespesas] = useState([]);
    //state para loading de despesas por filtro;
    const [loadingDespesasFiltro, setLoadingDespesasFiltro] = useState(false);
    //state para filtro de mes
    const [indexMesFiltro, setIndexMesFiltro] = useState(mesAtual);
    //state para filtro de ano
    const [indexAnoFiltro, setIndexAnoFiltro] = useState(indexAnoAtual);
    //controla botoes de filtro de ano e mes
    const [isVisible, setIsVisible] = useState(false);
    //controla o state de refresh da lista
    const [refreshingList, setRefreshingList] = useState(false);

    const {theme} = props;

    const recuperarDespesas = () => {
        setLoadingDespesasFiltro(true);
        let objParams = {
            params: {
                ano_referencia: arrayAnos()[indexAnoFiltro],
                mes_referencia: indexMesFiltro
            }
        }
        despesas.recuperarDespesas(objParams).then(response => {
            setArrDespesas(response);
            setLoadingDespesasFiltro(false);
            setRefreshingList(false);
        }).catch(error => {
            setLoadingDespesasFiltro(false);
            setRefreshingList(false);
        })
    }

    const buscarDespesasPorFiltro = () => {
        setIsVisible(false);
        setLoadingDespesasFiltro(true);
        recuperarDespesas();
    }

    useEffect(() => {
        console.log('useEffect');
        recuperarDespesas();
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            Keyboard.dismiss();
        }, [])
    );

    const onRefresList = () => {
        setRefreshingList(true);
        recuperarDespesas();
    }

    const listarDespesas = (despesa, index) => {
        let objIcon = getObjIcon(despesa.nome_catalogo);

        return (
            <TouchableScale
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //
            >
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
                        padding: 5
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
                            {`${arrayDatas()[despesa.mes_referencia]}/${despesa.ano_referencia}`}
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
            </TouchableScale>
        )
    }

    const toogleVisibleOverlay = () => {
        setIsVisible(!isVisible);
    }
    return (
        <>
            <View style={{display: "flex", flexDirection: 'row'}}>
                <View>
                    <FilterButton
                        onPress={() => setIsVisible(true)}
                        title={`${arrayDatas()[indexMesFiltro]}/${arrayAnos()[indexAnoFiltro]}`}
                    />
                    <Overlay
                        isVisible={isVisible}
                        onBackdropPress={toogleVisibleOverlay}
                    >
                        <View style={{display: "flex"}}>
                            <View style={{backgroundColor: '#FFF'}}>
                                <BoxAnoMes
                                    selectedIndexMes={indexMesFiltro}
                                    setSelectedIndexMes={setIndexMesFiltro}
                                    selectedIndexAno={indexAnoFiltro}
                                    setSelectedIndexAno={setIndexAnoFiltro}
                                    backgroundColorBtnMes='#FFF'
                                />
                            </View>
                            <View style={{backgroundColor: '#FFF'}}>
                                <Button
                                    title="Filtrar"
                                    buttonStyle={{backgroundColor: theme.colors.secondary, height: 50}}
                                    icon={{
                                        name: "filter",
                                        type: 'font-awesome-5',
                                        size: 15,
                                        color: "white"
                                    }}
                                    iconRight
                                    onPress={() => buscarDespesasPorFiltro()}
                                />
                            </View>
                        </View>
                    </Overlay>
                </View>
            </View>
            {(loadingDespesasFiltro) &&
            <View style={[styles.containerLoading, styles.horizontalLoading]}>
                <ActivityIndicator
                    size={100}
                    color={theme.colors.secondary}
                />
            </View>
            }
            {(!loadingDespesasFiltro) &&
            <FlatList
                data={arrDespesas}
                extraData={arrDespesas}
                renderItem={({item, index}) => (
                    listarDespesas(item, index)
                )}
                keyExtractor={item => item.id.toString()}
                refreshing={refreshingList}
                onRefresh={() => onRefresList()}
            />
            }
        </>
    )
}

export default withTheme(ListaDespesas);