import React, { useState } from 'react';
import { withTheme, Text} from 'react-native-elements';
import { View } from 'react-native';

const ListaDespesas = (props) => {
    const {theme} = props;

    return(
        <View>
            <Text>
                Teste
            </Text>
        </View>
    )
}

export default withTheme(ListaDespesas);