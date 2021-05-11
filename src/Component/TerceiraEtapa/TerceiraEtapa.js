import React, { useEffect, useState } from 'react';
import {Button} from 'react-native-elements';
import { View } from 'react-native';
import { getItemCatalogo } from '../../services/itemCatalogo';
import { Icon } from 'react-native-elements';
import { getObjIcon } from '../../utils/utils';
import {showMessage} from "react-native-flash-message";

const TerceiraEtapa = (props) => {

    const [arrItemCatalogo, setArrItemCatalogo] = useState([]);

    const handlePressCatalogo = (idCatalogo) => {
        props.setSelectedIdItemCatalogo( idCatalogo );
        props.swipeLeft();
    }

    useEffect(() => {
        let objParams = {params: {
                id_catalogo: props.idCatalogo
            }}
        getItemCatalogo(objParams).then(response => {
            if (response.length > 0) {
                setArrItemCatalogo(response);
            }else{
                showMessage({
                    message: `Esse catálogo ainda não possui item!`,
                    type: "warning",
                    icon: "warning",
                });
                props.swipeRight();
            }

        }).catch(error => {

        })
    }, [])

    const renderBtnItemCatalogo = () => {
        if(arrItemCatalogo.length > 0){
            return arrItemCatalogo.map((catalogo, index) => {
                let objIcon = getObjIcon(catalogo.nome);

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
                            icon={
                                <Icon
                                    name={props.nameIconItemCatalogo}
                                    type={props.typeIconItemCatalogo}
                                    size={15}
                                    color={props.selectedIdItemCatalogo === 0 ||
                                    props.selectedIdItemCatalogo !== catalogo.id
                                        ? 'gray'
                                        : props.theme.colors.secondary}
                                />
                            }
                            title={`   ${catalogo.nome}`}
                            titleStyle={{
                                fontSize: 10,
                                color:
                                    props.selectedIdItemCatalogo === 0 ||
                                    props.selectedIdItemCatalogo !== catalogo.id
                                        ? 'gray'
                                        : props.theme.colors.secondary,
                                fontWeight: 'bold'
                            }}
                            buttonStyle={{borderWidth: 2}}
                            type={
                                props.selectedIdItemCatalogo === 0 ||
                                props.selectedIdItemCatalogo !== catalogo.id
                                    ? 'outline'
                                    : 'solid'
                            }
                            onPress={() => handlePressCatalogo(catalogo.id)}
                        />
                    </View>
                )
            })
        }
    }

    return(
        <View style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', marginTop: 10}}>
            {
                renderBtnItemCatalogo()
            }
        </View>
    );
}

export default TerceiraEtapa;