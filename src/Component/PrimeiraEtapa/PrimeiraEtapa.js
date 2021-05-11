import React from 'react';
import {TextInputMask} from 'react-native-masked-text';
import {Card} from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';


const PrimeiraEtapa = (props) => {

    let inputRefValor = null;

    useFocusEffect(
        React.useCallback(() => {
            console.log(inputRefValor)
                inputRefValor.focus();
        }, [])
    );

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
                onSubmitEditing={props.swipeLeft}
                refInput={(ref) => inputRefValor = ref}
            />
        </Card>
    );

}

export default PrimeiraEtapa;