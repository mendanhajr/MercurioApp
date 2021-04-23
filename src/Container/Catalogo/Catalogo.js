import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import ButtonGroupTipoDespesas from "../../Component/ButtonGroupTipoDespesas/ButtonGroupTipoDespesas";
import * as catalogo from './../../services/catalogo';
import styles from './styles';
import {withTheme} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { showMessage} from "react-native-flash-message";

const Catalogo = (props) => {

    //state para o id do tipo de despesa selecionado (FIXA) default;
    const [selectedId, setSelectedId] = useState(0);
    //state do input de tipo de despesa
    const [nomeDespesa, setNomeDespesa] = useState('');
    //state para erros de requisicao
    const [anyErrorRequest, setAnyErrorRequest] = useState(false);
    const {theme} = props;

    const handleClickBtnSalvar = () => {
        let objParams = {
            nome: nomeDespesa,
            tipo_despesa_id: selectedId,
            situacao: true
        }
        catalogo.salvarCatalogo(objParams).then((response) => {
            if(response.success){
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
                    objStyles={{color: theme.colors.secondary, fontWeight: 'bold'}}
                    setAnyErrorRequest={setAnyErrorRequest}
                />
            </View>

            <View style={styles.itemFormTipoDespesa}>
                <Input
                    placeholder='NOME DA DESPESA'
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
                    disabled={anyErrorRequest}
                />
            </View>
        </View>
    );
}

export default withTheme(Catalogo);