import React from 'react';
import {Button, ButtonGroup, withTheme} from 'react-native-elements';
import {View} from 'react-native';
import {arrayDatas} from "../../utils/utils";

const anoAtual = new Date().getFullYear();

const BoxAnoMes = (props) => {

    const {theme} = props;

    const renderBtnMeses = () => {
        return arrayDatas().map((mes, index) => {
            return (
                <View
                    key={index}
                    style={{
                        margin: 5,
                        width: '30%',
                    }}
                >
                    <Button
                        key={index}
                        title={mes}
                        titleStyle={{
                            fontSize: 10,
                            color:
                                props.selectedIndexMes !== index
                                    ? 'gray'
                                    : theme.colors.secondary,
                            fontWeight: 'bold'
                        }}
                        buttonStyle={{borderWidth: 2}}
                        type={
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
        <>
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
                    selectedTextStyle={{color: theme.colors.secondary}}
                />
            </View>
            <View style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                paddingLeft: 10,
                paddingRight: 5
            }}>
                {
                    renderBtnMeses()
                }
            </View>
        </>
    )
}

export default withTheme(BoxAnoMes);