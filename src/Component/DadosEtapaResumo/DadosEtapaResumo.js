import React from 'react';
import {View} from "react-native";
import {Text} from "react-native-elements";
import {withTheme} from 'react-native-elements';
import styles from './styles';

const DadosEtapaResumo = (props) => {

    const  {theme} = props;
    return (
        <View style={styles.containerDadosDespesa}>
            <View style={styles.itemDadosDespesa}>
                <Text
                    style={{color: theme.colors.secondary, fontSize: 18, fontWeight: 'bold'}}
                >
                    {props.label}:
                </Text>
            </View>
            <View style={[styles.itemDadosDespesa, {alignItems: 'flex-end'}]}>
                <Text
                    style={{color: theme.colors.secondary, fontSize: 18}}
                >
                    {props.dado.toUpperCase()}
                </Text>
            </View>
        </View>
    )
}

export default withTheme(DadosEtapaResumo);