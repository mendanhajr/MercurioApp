import React, {useState, useEffect} from 'react';
import ButtonGroupTipoDespesas from "../../Component/ButtonGroupTipoDespesas/ButtonGroupTipoDespesas";
import {getCatalogo} from '../../services/catalogo';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import {Button} from "react-native-elements";

const SegundaEtapa = (props) => {
    useEffect(() => {
        getCatalogo().then(response => {
            if (response.length > 0) {
                setArrObjCatalogo(response);
                setLoadingCatalogo(false);
            }

        }).catch(error => {
            setLoadingCatalogo(false);
            props.setAnyErrorRequest(true);
            console.log(error)
        })
    }, [arrObjCatalogo])

    //state que guarda o obj tipo de despesa - nescessário para recuperar o id do tipo de despesa
    const [arrObjCatalogo, setArrObjCatalogo] = useState([]);
    //LOADINGS
    const [loadingCatalogo, setLoadingCatalogo] = useState(true);

    const renderBtnCatalogos = () => {
        if(arrObjCatalogo.length > 0){
            let arrCatalogoFiltradoPorTipo = arrObjCatalogo.filter(catalogo => {
                return catalogo.tipo_despesa_id === props.selectedIdTipoDespesa;
            });
            return arrCatalogoFiltradoPorTipo.map((catalogo, index) => {
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
                            title={catalogo.nome.toUpperCase()}
                            titleStyle={{
                                fontSize: 10,
                                color:
                                    props.selectedIdCatalogo === 0 ||
                                    props.selectedIdCatalogo !== catalogo.id
                                        ? 'gray'
                                        : props.theme.colors.secondary,
                                fontWeight: 'bold'
                            }}
                            buttonStyle={{borderWidth: 2}}
                            type={
                                props.selectedIdCatalogo === 0 ||
                                props.selectedIdCatalogo !== catalogo.id
                                    ? 'outline'
                                    : 'solid'
                            }
                            onPress={() => props.setSelectedIdCatalogo(catalogo.id)}
                        />
                    </View>
                )
            })
        }
    }

    return (
        <View style={{display: "flex", justifyContent: 'space-between' , height: '100%'}}>
            <View>
                <ButtonGroupTipoDespesas
                    setSelectedId={props.setSelectedIdTipoDespesa}
                    objStyles={{color: props.theme.colors.secondary, fontWeight: 'bold'}}
                    setAnyErrorRequest={props.setAnyErrorRequest}
                />
            </View>
            <View style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
                {
                    renderBtnCatalogos()
                }
            </View>
            <View style={{marginBottom: 0}}>
                <Button
                    title="PRÓXIMO "
                    raised
                    buttonStyle={{backgroundColor: props.theme.colors.secondary}}
                    onPress={props.swipeLeft}
                    loading={false}
                    icon={
                        <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                        />
                    }
                    iconRight
                    disabled={props.selectedIdCatalogo === 0}
                />
            </View>
        </View>
    );
};

export default SegundaEtapa;