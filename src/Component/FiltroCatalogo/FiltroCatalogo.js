import React, {useState} from 'react';
import {View} from 'react-native';
import {Overlay, CheckBox, Text, withTheme, Button} from "react-native-elements";
import ButtonGroupTipoDespesas from "../ButtonGroupTipoDespesas/ButtonGroupTipoDespesas";

const FiltroCatalogo = (props) => {

    const {theme} = props;
    //state para o id do tipo de despesa
    const [selectedIdTipoDespesa, setSelectedIdTipoDespesa] = useState(0);
    //state para o id do catalogo;
    const [selectedIdCatalogo, setSelectedIdCatalogo] = useState(0);
    //state para o nome do catalogo
    const [nomeCatalogo, setNomeCatalogo] = useState('');

    const handleSetSelectedIdCatalogo = (idCatalogo) => {
        let indexArrayCatalogo = props.arrIdCatalogo.findIndex(arr => arr === idCatalogo);
        let newArrIdCatalogo = [...props.arrIdCatalogo];
        if (indexArrayCatalogo === -1) {
            newArrIdCatalogo.push(idCatalogo);
            props.setArrIdCatalogo(newArrIdCatalogo);
        } else {
            newArrIdCatalogo.splice(indexArrayCatalogo, 1);
            props.setArrIdCatalogo(newArrIdCatalogo);
        }
    }

    return (
        <Overlay
            isVisible={props.isVisible}
            onBackdropPress={props.onBackdropPress}
        >
            <View style={{display: "flex"}}>
                <View>
                    <ButtonGroupTipoDespesas
                        setSelectedId={setSelectedIdTipoDespesa}
                        objStyles={{color: theme.colors.secondary, fontWeight: 'bold'}}
                        selectedIdCatalogo={selectedIdCatalogo}
                        setNomeCatalogo={setNomeCatalogo}
                        setSelectedIdCatalogo={(idCatalogo) => handleSetSelectedIdCatalogo(idCatalogo)}
                        from='FiltroCatalogo'
                        arrIdCatalogo={props.arrIdCatalogo}
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
                        onPress={() => props.buscarDespesasPorFiltro()}
                    />
                </View>
            </View>
        </Overlay>
    )
}

export default withTheme(FiltroCatalogo);