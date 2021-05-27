import React from 'react';
import {TouchableOpacity, Text } from "react-native";
import styles from './styles';
import {withTheme} from 'react-native-elements';
import { Icon } from 'react-native-elements';

const FilterButton = (props) => {
    const {theme} = props;
    return(
        <TouchableOpacity
            onPress={props.onPress}
            activeOpacity={0.6}
            style={[styles.appButtonContainer]}
        >
            <Text style={[styles.appButtonText, {color: theme.colors.secondary}]}>{props.title}</Text>
            <Icon
                name='chevron-down'
                type='font-awesome-5'
                size={12}
                color={theme.colors.secondary}
            />

        </TouchableOpacity>
    )
};

export default withTheme(FilterButton);
