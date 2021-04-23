import React, {useEffect, useState} from 'react';
import { ButtonGroup, Text } from 'react-native-elements';
import * as tipoDespesa from './../../services/tipoDespesas';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ButtonGroupTipoDespesas = (props) => {

    const iconFixa =
        <Icon
            name="home"
            size={25}
            color={props.objStyles.color}
        />

    const iconDiversas =
        <Icon
            name="store-alt"
            size={22}
            color={props.objStyles.color}
        />

    useEffect(() => {
        tipoDespesa.getTipoDespesas().then(response => {

            if (response.length > 0) {
                let arrTipoDespesa = response.map((objTpDespesa, index) => {
                    return <Text h4 h4Style={{color: props.objStyles.color}}>
                        {
                            objTpDespesa.nome === 'FIXA' ? iconFixa
                                : objTpDespesa.nome === 'DIVERSAS' ?
                                iconDiversas : ''
                        } {objTpDespesa.nome}
                    </Text>
                })
                setArrNomeTipoDespesas(arrTipoDespesa);
                setArrObjTipoDespesas(response);
                props.setSelectedId(response[0].id);
            } else {
                setArrNomeTipoDespesas(['error :(']);
                props.setAnyErrorRequest(true);
            }
            setLoadingTipoDespesa(false);

        }).catch(error => {
            setLoadingTipoDespesa(false);
            props.setAnyErrorRequest(true);
            console.log(error)
        })

    }, [arrNomeTipoDespesas, arrObjTipoDespesas]);

    //state para armazenar o index corrente do botao selecionado
    const [selectedIndex, setSelectedIndex] = useState(0);
    //state para apresentacao do nome do tipo de despesa nos botoes
    const [arrNomeTipoDespesas, setArrNomeTipoDespesas] = useState([]);
    //state que guarda o obj tipo de despesa - nescessário para recuperar o id do tipo de despesa
    const [arrObjTipoDespesas, setArrObjTipoDespesas] = useState([]);
    //LOADINGS
    const [loadingTipoDespesa, setLoadingTipoDespesa] = useState(true);

    const handleChangeSelected = (value) => {
        props.setSelectedId(arrObjTipoDespesas[value].id);
        setSelectedIndex(value);
    }
    return (
        <ButtonGroup
            onPress={(value) => handleChangeSelected(value)}
            selectedIndex={selectedIndex}
            buttons=
                {
                    loadingTipoDespesa ?
                        ['carregando...']
                        : arrNomeTipoDespesas
                }
            containerStyle={{height: 50}}
            textStyle={{fontWeight: props.objStyles.fontWeight}}
        />
    )

}

export default ButtonGroupTipoDespesas;