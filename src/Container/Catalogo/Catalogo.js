import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import ButtonGroupTipoDespesas from "../../Component/ButtonGroupTipoDespesas/ButtonGroupTipoDespesas";
import * as itemCatalogo from './../../services/itemCatalogo';
import styles from './styles';
import {withTheme} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {showMessage} from "react-native-flash-message";

const Catalogo = (props) => {

    //state para o id do tipo de despesa selecionado (FIXA) default;
    const [selectedId, setSelectedId] = useState(0);
    //state para o id do catalogo;
    const [selectedIdCatalogo, setSelectedIdCatalogo] = useState(0);
    //state do input de tipo de despesa
    const [nomeDespesa, setNomeDespesa] = useState('');

    const [indexSelectedCatalogo, setIndexSelectedCatalogo] = useState(0);
    const {theme} = props;

    const handleClickBtnSalvar = () => {
        let objParams = {
            nome: nomeDespesa,
            descricao: 'remover essa coluna',
            id_catalogo: selectedIdCatalogo,
            gerar_automatico: false
        }
        itemCatalogo.salvarItemCatalogo(objParams).then((response) => {
            if (response.success) {
                showMessage({
                    message: `O item de catálogo ${response.response.nome} foi salvo!`,
                    type: "success",
                    icon: "success",
                });
                props.navigation.navigate('Despesas');
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.itemFormTipoDespesa}>
                <ButtonGroupTipoDespesas
                    setSelectedId={setSelectedId}
                    selectedIdCatalogo={selectedIdCatalogo}
                    setSelectedIdCatalogo={setSelectedIdCatalogo}
                    objStyles={{color: theme.colors.secondary}}
                />
            </View>
            <View style={styles.itemFormTipoDespesa}>
                <Input
                    placeholder='Nome do item de catálogo'
                    value={nomeDespesa}
                    onChangeText={(value) => setNomeDespesa((value))}
                />
            </View>
            <View style={styles.itemFormTipoDespesa}>
                <Button
                    icon={
                        <Icon
                            name="save"
                            size={15}
                            color={theme.colors.secondary}
                        />
                    }
                    title=" SALVAR"
                    raised
                    titleStyle={{color: theme.colors.secondary}}
                    onPress={() => handleClickBtnSalvar()}
                    disabled={!(nomeDespesa && selectedIdCatalogo)}
                />
            </View>
        </View>
    );
}

export default withTheme(Catalogo);