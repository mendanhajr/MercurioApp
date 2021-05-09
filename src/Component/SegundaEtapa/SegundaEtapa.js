import React from 'react';
import ButtonGroupTipoDespesas from "../../Component/ButtonGroupTipoDespesas/ButtonGroupTipoDespesas";
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Button} from "react-native-elements";

const SegundaEtapa = (props) => {

    return (
        <View style={{display: "flex", justifyContent: 'space-between' , height: '100%'}}>
            <View>
                <ButtonGroupTipoDespesas
                    setSelectedId={props.setSelectedIdTipoDespesa}
                    objStyles={{color: props.theme.colors.secondary, fontWeight: 'bold'}}
                    selectedIdCatalogo={props.selectedIdCatalogo}
                    setSelectedIdCatalogo={props.setSelectedIdCatalogo}
                    handlePressBtnCatalogo={props.handlePressBtnCatalogo}
                    from={props.from}
                />
            </View>
        </View>
    );
};

export default SegundaEtapa;