import React, {useState, useEffect} from 'react';
import {View, Keyboard} from 'react-native';
import {Input, Button} from 'react-native-elements';
import ButtonGroupTipoDespesas from "../../Component/ButtonGroupTipoDespesas/ButtonGroupTipoDespesas";
import * as itemCatalogo from './../../services/itemCatalogo';
import styles from './styles';
import {withTheme} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {showMessage} from "react-native-flash-message";
import {useFocusEffect} from '@react-navigation/native';

const Catalogo = (props) => {

    //state para o id do tipo de despesa selecionado (FIXA) default;
    const [selectedId, setSelectedId] = useState(0);
    //state para o id do catalogo;
    const [selectedIdCatalogo, setSelectedIdCatalogo] = useState(0);
    //state do input de tipo de despesa
    const [nomeDespesa, setNomeDespesa] = useState('');

    const [nomeCatalogo, setNomeCatalogo] = useState('');

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const {theme} = props;


    useFocusEffect(
        React.useCallback(() => {
            Keyboard.dismiss();
        }, [])
    );

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    })

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
            <View style={styles.item}>
                <Input
                    placeholder='Nome do item de catálogo'
                    value={nomeDespesa}
                    onChangeText={(value) => setNomeDespesa((value))}
                />
            </View>
            {(!isKeyboardVisible) &&
            <>
                <View style={styles.item}>
                    <ButtonGroupTipoDespesas
                        setSelectedId={setSelectedId}
                        selectedIdCatalogo={selectedIdCatalogo}
                        setSelectedIdCatalogo={setSelectedIdCatalogo}
                        setNomeCatalogo={setNomeCatalogo}
                        objStyles={{color: theme.colors.secondary}}
                    />
                </View>
                <View style={styles.item}>
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
            </>
            }
        </View>
    );
}

export default withTheme(Catalogo);