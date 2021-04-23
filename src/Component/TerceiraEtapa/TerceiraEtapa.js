import React from 'react';
import {View} from 'react-native';
import {Button, ButtonGroup} from 'react-native-elements';
import { arrayDatas } from '../../utils/utils';
import Icon from "react-native-vector-icons/FontAwesome5";
const anoAtual = new Date().getFullYear();

const TerceiraEtapa = (props) => {

    const renderBtnMeses = () => {
        return arrayDatas().map((mes, index) => {
            return (
                <View
                    key={index}
                    style={{
                        margin: 5,
                        width: '30%'
                    }}
                >
                    <Button
                        key={index}
                        title={mes}
                        titleStyle={{
                            fontSize: 10,
                            color:
                                props.selectedIndexMes === 0 ||
                                props.selectedIndexMes !== index
                                    ? 'gray'
                                    : props.theme.colors.secondary,
                            fontWeight: 'bold'
                        }}
                        buttonStyle={{borderWidth: 2}}
                        type={
                            props.selectedIndexMes === 0 ||
                            props.selectedIndexMes !== index
                                ? 'outline'
                                : 'solid'
                        }
                        onPress={() => props.setSelectedIndexMes(index)}
                    />
                </View>
            )
        })
    }

    return (
        <View style={{display: "flex", justifyContent: 'space-between' , height: '100%'}}>
            <View>
                <ButtonGroup
                    onPress={(value) => props.setSelectedIndexAno(value)}
                    selectedIndex={props.selectedIndexAno}
                    buttons=
                        {
                            [anoAtual - 1, anoAtual, anoAtual + 1]
                        }
                    containerStyle={{height: 50}}
                    textStyle={{fontWeight: 'bold'}}
                    selectedTextStyle={{color: props.theme.colors.secondary}}
                />
            </View>

            <View style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
                {
                    renderBtnMeses()
                }
            </View>

            <View style={{marginBottom: 0}}>
                <Button
                    title="FINALIZAR "
                    raised
                    buttonStyle={{backgroundColor: props.theme.colors.secondary}}
                    onPress={props.handleClickBtnSalvar}
                    loading={false}
                    icon={
                        <Icon
                            name="arrow-right"
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

export default TerceiraEtapa