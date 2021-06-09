import React from 'react';
import {View} from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import BoxAnoMes from "../BoxAnoMes/BoxAnoMes";

const QuartaEtapa = (props) => {

    return (
        <View style={{display: 'flex', height: '90%', justifyContent: 'space-around'}}>
            <View>
                <BoxAnoMes
                    selectedIndexMes={props.selectedIndexMes}
                    setSelectedIndexMes={props.setSelectedIndexMes}
                    selectedIndexAno={props.selectedIndexAno}
                    setSelectedIndexAno={props.setSelectedIndexAno}
                />
            </View>
            <View>
                <CheckBox
                    checked={props.statusDespesa}
                    title={props.statusDespesa ? 'PAGA' : 'ABERTA'}
                    center
                    onPress={() => props.setStatusDespesa(!props.statusDespesa)}
                />
            </View>
            <View style={{marginBottom: 0}}>
                <Button
                    title="IR PARA RESUMO "
                    raised
                    buttonStyle={{backgroundColor: props.theme.colors.secondary}}
                    onPress={props.swipeLeft}
                    loading={false}
                    icon={
                        <Icon
                            name="arrow-right"
                            type={'font-awesome'}
                            size={15}
                            color="white"
                        />
                    }
                    iconRight
                />
            </View>
        </View>
    )
}

export default QuartaEtapa