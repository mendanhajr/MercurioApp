import React from 'react';
import {TextInputMask} from 'react-native-masked-text';
import {Card} from 'react-native-elements';


const PrimeiraEtapa = (props) => {

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
            />
        </Card>
    );

}

export default PrimeiraEtapa;