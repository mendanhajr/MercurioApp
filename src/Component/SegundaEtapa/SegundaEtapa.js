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
                    setAnyErrorRequest={props.setAnyErrorRequest}
                />
            </View>
            <View style={{marginBottom: 0}}>
                <Button
                    title="PRÓXIMO "
                    raised
                    buttonStyle={{backgroundColor: props.theme.colors.secondary}}
                    onPress={props.swipeLeft}
                    loading={false}
                    icon={
                        <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                        />
                    }
                    iconRight
                    disabled={props.selectedIdCatalogo === 0}
                />
            </View>
        </View>
    );
};

export default SegundaEtapa;