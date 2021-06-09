import React from 'react';
import {View} from 'react-native';
import DadosEtapaResumo from "../DadosEtapaResumo/DadosEtapaResumo";
import styles from "./styles";
import {Button, Icon} from "react-native-elements";
import {arrayDatas} from '../../utils/utils';
import {arrayAnos} from '../../utils/utils';

const QuintaEtapa = (props) => {
    return (
        <View style={{display: 'flex', justifyContent: 'space-around', height: '90%'}}>
            <View
                style={styles.containerNota}
            >
                    <View style={{opacity: 0.2}}>
                        <Icon
                            name={props.nameIconItemCatalogo}
                            type={props.typeIconItemCatalogo}
                            size={140}
                            color={props.theme.colors.secondary}
                        />
                    </View>
                    <DadosEtapaResumo
                        label='TIPO'
                        dado={
                            props.selectedIdTipoDespesa === 1 ?
                                'FIXA' :
                                props.selectedIdTipoDespesa === 2 ?
                                    'DIVERSAS' :
                                    'NÃO DEFINIDO'
                        }
                    />
                    <DadosEtapaResumo
                        label='CAT'
                        dado={props.nomeCatalogo}
                    />
                    <DadosEtapaResumo
                        label='ITEM'
                        dado={props.nomeItemCatalogo}
                    />
                    <DadosEtapaResumo
                        label='STATUS'
                        dado={
                            props.statusDespesa ? 'PAGA' : 'ABERTA'
                        }
                    />
                    <DadosEtapaResumo
                        label='REF'
                        dado={`${arrayDatas()[props.selectedIndexMes]}/${arrayAnos()[props.selectedIndexAno]}`}
                    />
                    <DadosEtapaResumo
                        label='VALOR'
                        dado={props.valor}
                    />
            </View>
            <View>
                <Button
                    title="SALVAR REGISTRO   "
                    raised
                    buttonStyle={{backgroundColor: props.theme.colors.secondary}}
                    onPress={() => props.handleClickBtnSalvar(props.swipeLeft)}
                    loading={false}
                    icon={
                        <Icon
                            name="save"
                            solid
                            type={'font-awesome-5'}
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
export default QuintaEtapa;