import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, View, Keyboard, FlatList} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {withTheme, Text, Overlay, Icon, Button} from 'react-native-elements';
import * as despesas from '../../services/despesas.js';
import FilterButton from '../../Component/FilterButton/FilterButton';
import {useFocusEffect} from '@react-navigation/native';
import {arrayDatas, arrayAnos, getObjIcon} from '../../utils/utils';
import styles from './styles';
import BoxAnoMes from "../../Component/BoxAnoMes/BoxAnoMes";
import FiltroCatalogo from "../../Component/FiltroCatalogo/FiltroCatalogo";

const anoAtual = new Date().getFullYear();
const mesAtual = new Date().getMonth();
const indexAnoAtual = arrayAnos().findIndex(ano => ano === anoAtual);

const ListaDespesas = (props) => {

    //state para o array de despesas;
    const [arrDespesas, setArrDespesas] = useState([]);
    //state para valor total de despesas
    const [valorTotal, setValorTotal] = useState(0);
    //state para loading de despesas por filtro;
    const [loadingDespesasFiltro, setLoadingDespesasFiltro] = useState(true);
    //state para filtro de mes
    const [indexMesFiltro, setIndexMesFiltro] = useState(mesAtual);
    //state para filtro de ano
    const [indexAnoFiltro, setIndexAnoFiltro] = useState(indexAnoAtual);
    //controla botoes de filtro de ano e mes
    const [isVisible, setIsVisible] = useState(false);
    //controla botoes de filtro de catalogo
    const [isVisibleFiltroCatalogo, setIsVisibleFiltroCatalogo] = useState(false);
    //controla o state de refresh da lista
    const [refreshingList, setRefreshingList] = useState(false);
    //state para array de idcatalogos selecionados
    const [arrIdCatalogo, setArrIdCatalogo] = useState([]);
    //state para array de nomecatalogos selecionados
    const [arrNomeCatalogo, setArrNomeCatalogo] = useState([]);

    const {theme} = props;

    const recuperarDespesas = () => {
        let objParams = {
            params: {
                ano_referencia: arrayAnos()[indexAnoFiltro],
                mes_referencia: indexMesFiltro + 1,
                idCatalogo: arrIdCatalogo.length > 0 ? encodeURIComponent(JSON.stringify(arrIdCatalogo)) : null
            }
        }
        despesas.recuperarDespesas(objParams).then(response => {
            setArrDespesas(response.result);
            setValorTotal(response.valorTotal);
            setLoadingDespesasFiltro(false);
            setRefreshingList(false);
        }).catch(error => {
            setLoadingDespesasFiltro(false);
            setRefreshingList(false);
        })
    }

    const buscarDespesasPorFiltro = () => {
        setIsVisible(false);
        setIsVisibleFiltroCatalogo(false);
        setLoadingDespesasFiltro(true);
        recuperarDespesas();
    }

    useEffect(() => {
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
                            size={20}
                            raised
                        />
                    </View>
                    <View style={{flexGrow: 1, padding: 5}}>
                        <Text style={{color: theme.colors.secondary}}>{`${despesa.nome}`}</Text>
                        <Text style={{fontSize: 10, color: 'gray'}}>
                            {`${arrayDatas()[despesa.mes_referencia - 1]}/${despesa.ano_referencia}`}
                        </Text>
                        <Text style={{fontSize: 10, color: 'gray'}}>{`R$ ${despesa.valor}`}</Text>
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
                            size={20}
                        />
                    </View>
                </View>
            </TouchableScale>
        )
    }

    const getTituloFiltroCatalogo = () => {
        if(arrNomeCatalogo.length > 0){
            return arrNomeCatalogo.map(nomeCatalogo => {
                let objetoIcone = getObjIcon(nomeCatalogo);
                return(
                    <Icon
                        name={objetoIcone.name}
                        type={objetoIcone.type}
                        color={theme.colors.secondary}
                        size={15}
                        style={{marginRight: 5}}
                    />
                )
            })
        }
        return 'TODOS';
    }
    return (
        <SafeAreaView style={{height: '100%'}}>
            <View style={{display: "flex", flexDirection: 'row', backgroundColor: theme.colors.primary}}>
                <FilterButton
                    onPress={() => setIsVisible(true)}
                    title={`${arrayDatas()[indexMesFiltro]}/${arrayAnos()[indexAnoFiltro]}`}
                />
                <Overlay
                    isVisible={isVisible}
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
                <View style={{flexGrow: 1}}>
                    <FilterButton
                        onPress={() => setIsVisibleFiltroCatalogo(true)}
                        title={getTituloFiltroCatalogo()}
                    />
                    <FiltroCatalogo
                        isVisible={isVisibleFiltroCatalogo}
                        buscarDespesasPorFiltro={buscarDespesasPorFiltro}
                        arrIdCatalogo={arrIdCatalogo}
                        arrNomeCatalogo={arrNomeCatalogo}
                        setArrIdCatalogo={setArrIdCatalogo}
                        setArrNomeCatalogo={setArrNomeCatalogo}
                    />
                </View>
                <View style={{flexGrow: 1, alignItems: 'center', paddingVertical: 15}}>
                    {(loadingDespesasFiltro) &&
                    <View>
                        <ActivityIndicator
                            color={theme.colors.secondary}
                        />
                    </View>
                    }
                    {(!loadingDespesasFiltro) &&
                    <Text style={{fontSize: 14, fontWeight: "bold", color: theme.colors.secondary}}>
                        R$: {valorTotal}
                    </Text>
                    }
                </View>
            </View>
            {(loadingDespesasFiltro) &&
            <View>
                <ActivityIndicator
                    size={70}
                    color={theme.colors.secondary}
                />
            </View>
            }
            {(!loadingDespesasFiltro && arrDespesas.length > 0) &&
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
            {(!loadingDespesasFiltro && arrDespesas.length === 0) &&
            <View style={{alignSelf: 'center'}}>
                <Text h4 h4Style={{color: theme.colors.secondary}}>
                    Nenhuma despesa encontrada
                </Text>
            </View>
            }
        </SafeAreaView>
    )
}

export default withTheme(ListaDespesas);