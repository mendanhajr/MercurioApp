import React, {useEffect, useState} from 'react';
import {ButtonGroup, useTheme} from 'react-native-elements';
import * as tipoDespesa from './../../services/tipoDespesas';
import GridCatalogo from "../GridCatalogo/GridCatalogo";
import {ActivityIndicator, View} from "react-native";

const ButtonGroupTipoDespesas = (props) => {

    //state para armazenar o index corrente do botao selecionado
    const [selectedIndex, setSelectedIndex] = useState(0);
    //state para armazenar o id do tipo da despesa
    const [selectedIdTipoDespesa, setSelectedIdTipoDespesa] = useState(0);
    //state para apresentacao do nome do tipo de despesa nos botoes
    const [arrNomeTipoDespesas, setArrNomeTipoDespesas] = useState([]);
    //state que guarda o obj tipo de despesa - nescessário para recuperar o id do tipo de despesa
    const [arrObjTipoDespesas, setArrObjTipoDespesas] = useState([]);
    //LOADINGS
    const [loadingTipoDespesa, setLoadingTipoDespesa] = useState(true);

    const { theme } = useTheme();

    useEffect(() => {
        tipoDespesa.getTipoDespesas().then(response => {
            if (response.length > 0) {
                let arrTipoDespesa = response.map((objTpDespesa, index) => {
                    return (`${objTpDespesa.nome}`)
                })
                setArrNomeTipoDespesas(arrTipoDespesa);
                setArrObjTipoDespesas(response);
                props.setSelectedId(response[0].id);
                setSelectedIdTipoDespesa(response[0].id);

            } else {
                setArrNomeTipoDespesas(['error :(']);
            }
            setLoadingTipoDespesa(false);

        }).catch(error => {
            setLoadingTipoDespesa(false);
            console.log(error)
        })

    }, []);

    const handleChangeSelected = (value) => {
        props.setSelectedId(arrObjTipoDespesas[value].id);
        setSelectedIdTipoDespesa(arrObjTipoDespesas[value].id);
        setSelectedIndex(value);
    }
    if (loadingTipoDespesa) {
        return (
            <View>
                <ActivityIndicator
                    size={50}
                    color={theme.colors.secondary}
                />
            </View>
        )
    }
    if (arrNomeTipoDespesas.length > 0 && !loadingTipoDespesa) {
        return (
            <>
                <ButtonGroup
                    onPress={(value) => handleChangeSelected(value)}
                    selectedIndex={selectedIndex}
                    buttons=
                        {
                            loadingTipoDespesa ?
                                ['carregando...']
                                : arrNomeTipoDespesas
                        }
                    containerStyle={{height: 30}}
                    selectedTextStyle={{color: 'green'}}
                    textStyle={{fontWeight: 'bold'}}
                />
                <GridCatalogo
                    selectedIdTipoDespesa={selectedIdTipoDespesa}
                    selectedIdCatalogo={props.selectedIdCatalogo}
                    setSelectedIdCatalogo={props.setSelectedIdCatalogo}
                    setNomeCatalogo={props.setNomeCatalogo}
                    handlePressBtnCatalogo={props.handlePressBtnCatalogo}
                    from={props.from}
                    arrIdCatalogo={props.arrIdCatalogo}
                />
            </>
        )
    }
}

export default ButtonGroupTipoDespesas;