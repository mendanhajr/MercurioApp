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

    const setarArrIdCatalogo = (idCatalogo) => {
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

    const setarArrNomeCatalogo = (nomeCatalogo) => {
        let indexArrayNomeCatalogo = props.arrNomeCatalogo.findIndex(arr => arr === nomeCatalogo);
        let newArrNomeCatalogo = [...props.arrNomeCatalogo];
        if (indexArrayNomeCatalogo === -1) {
            newArrNomeCatalogo.push(nomeCatalogo);
            props.setArrNomeCatalogo(newArrNomeCatalogo);
        } else {
            newArrNomeCatalogo.splice(indexArrayNomeCatalogo, 1);
            props.setArrNomeCatalogo(newArrNomeCatalogo);
        }
    }

    return (
        <Overlay
            isVisible={props.isVisible}
        >
            <View style={{display: "flex"}}>
                <View>
                    <ButtonGroupTipoDespesas
                        setSelectedId={setSelectedIdTipoDespesa}
                        objStyles={{color: theme.colors.secondary, fontWeight: 'bold'}}
                        selectedIdCatalogo={selectedIdCatalogo}
                        setNomeCatalogo={(setNomeCatalogo) => setarArrNomeCatalogo(setNomeCatalogo)}
                        setSelectedIdCatalogo={(idCatalogo) => setarArrIdCatalogo(idCatalogo)}
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