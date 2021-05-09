import React, { useEffect, useState } from 'react';
import {Text, withTheme} from 'react-native-elements';
import { View } from 'react-native';
import { getCatalogo } from '../../services/catalogo';
import { Icon } from 'react-native-elements';
import { getObjIcon } from '../../utils/utils';

const GridCatalogo = (props) => {

    const [arrCatalogo, setArrCatalogo] = useState([]);
    const [loadingCatalogo, setLoadingCatalogo] = useState(true);

    const { theme } = props;

    const renderBtnCatalogos = () => {
        if(arrCatalogo.length > 0){
            let arrCatalogoFiltradoPorTipo = arrCatalogo.filter(catalogo => {
                return catalogo.tipo_despesa_id === props.selectedIdTipoDespesa;
            });
            return arrCatalogoFiltradoPorTipo.map((catalogo, index) => {
                let objIcon = getObjIcon(catalogo.nome);
                console.log(catalogo.id === props.setSelectedIdCatalogo)
                return (
                    <View
                        key={index}
                        style={{
                            margin: 5,
                            width: '30%'
                        }}
                    >
                        <Icon
                            name={objIcon.name}
                            type={objIcon.type}
                            color={catalogo.id === props.selectedIdCatalogo ? theme.colors.primary : theme.colors.secondary}
                            onPress={() => props.setSelectedIdCatalogo( catalogo.id )}
                            size={45}
                        />
                        <Text
                            style={
                                {
                                    textAlign: 'center',
                                    fontSize: 11,
                                    color: '#000',
                                }
                            }>
                            {catalogo.nome}
                        </Text>
                    </View>
                )
            })
        }
    }

    useEffect(() => {
        getCatalogo().then(response => {
            if (response.length > 0) {
                setArrCatalogo(response);
                setLoadingCatalogo(false);
            }

        }).catch(error => {
            setLoadingCatalogo(false);
        })
    }, [])

    return(
        <View style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', marginTop: 10}}>
            {
                renderBtnCatalogos()
            }
        </View>
    );
}

export default withTheme(GridCatalogo);