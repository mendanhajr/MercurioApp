import React from 'react';
import {TouchableOpacity, Text, View } from "react-native";
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
            <View style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View>
                    <Text style={[styles.appButtonText, {color: theme.colors.secondary}]}>{props.title}</Text>
                </View>
                <View style={{alignSelf: 'center'}}>
                    <Icon
                        name='chevron-down'
                        type='font-awesome-5'
                        size={12}
                        color={theme.colors.secondary}
                        style={{alignSelf: 'flex-end'}}
                    />
                </View>
            </View>

        </TouchableOpacity>
    )
};

export default withTheme(FilterButton);
