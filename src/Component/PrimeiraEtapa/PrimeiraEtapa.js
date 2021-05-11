import React from 'react';
import {TextInputMask} from 'react-native-masked-text';
import {Card} from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import {showMessage} from "react-native-flash-message";

const PrimeiraEtapa = (props) => {

    let inputRefValor = null;

    useFocusEffect(
        React.useCallback(() => {
                inputRefValor.focus();
        }, [])
    );

    const handleSubmitEditing = () => {
        let valor_format = props.valor.replace('R$', '');
        if (valor_format !== '0,00') {
            props.swipeLeft();
        }else{
            showMessage({
                message: `O valor deve ser informado!`,
                type: "danger",
                icon: "danger",
            });
        }
    }

    return (
        <Card
            wrapperStyle={{alignItems: 'center'}}
        >
            <Card.Title style={{color: props.theme.colors.secondary}}>VALOR:</Card.Title>
            <Card.Divider/>
            <TextInputMask
                type={'money'}
                value={props.valor}
                onChangeText={(value) => props.setValor(value)}
                style={{fontSize: 30}}
                autoFocus
                onSubmitEditing={() => handleSubmitEditing()}
                blurOnSubmit={false}
                refInput={(ref) => inputRefValor = ref}
            />
        </Card>
    );

}

export default PrimeiraEtapa;