import React, { useState, useEffect } from 'react';
import {withTheme} from 'react-native-elements';
import {View} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import PrimeiraEtapa from "../../Component/PrimeiraEtapa/PrimeiraEtapa";
import SegundaEtapa from "../../Component/SegundaEtapa/SegundaEtapa";
import TerceiraEtapa from "../../Component/TerceiraEtapa/TerceiraEtapa";
import QuartaEtapa from "../../Component/QuartaEtapa/QuartaEtapa";
import * as despesas from './../../services/despesas';
const mesAtual = new Date().getMonth();
import styles from './styles';
import {showMessage} from "react-native-flash-message";
import { useIsFocused } from '@react-navigation/native';


function Despesas(props) {
    //valor da despesa
    const [valor, setValor] = useState('0,00');
    //state para o id do tipo de despesa selecionado (FIXA) default;
    const [selectedIdTipoDespesa, setSelectedIdTipoDespesa] = useState(0);
    //state para o id do tipo de despesa selecionado (FIXA) default;
    const [selectedIdCatalogo, setSelectedIdCatalogo] = useState(0);
    //state para o id do tipo de despesa selecionado (FIXA) default;
    const [selectedIdItemCatalogo, setSelectedIdItemCatalogo] = useState(0);
    //state para o id do tipo de despesa selecionado (FIXA) default;
    const [nameIconItemCatalogo, setNameIconItemCatalogo] = useState('');
    const [typeIconItemCatalogo, setTypeIconItemCatalogo] = useState('');
    //state para o ano da despesa
    const [selectedIndexAno, setSelectedIndexAno] = useState(1);
    //state para controlar o mes da despesa
    const [selectedIndexMes, setSelectedIndexMes] = useState(mesAtual);

    const [statusDespesa, setStatusDespesa] = useState(true);

    const [cardIndex, setCardIndex] = useState(0);
    const [despesaIsFocused, setDespesaIsFocused] = useState(false);

    const {theme} = props;
    let refSwiper = null;

    useEffect(() => {
        console.log(props.navigation.isFocused());
    }, [])

    const handleClickBtnSalvar = (swipeLeft) => {
        let vl_despesa = valor.replace('.', ''),
            vl_despesa_formatado1 = vl_despesa.replace(',', '.'),
            vl_despesa_formatado2 = vl_despesa_formatado1.replace('R$', '');

        let objParams = {
            valor: vl_despesa_formatado2,
            item_catalogo_id : selectedIdItemCatalogo,
            status: statusDespesa ? 'P' : 'A',
            mes_referencia: selectedIndexMes,
            ano_referencia: selectedIndexAno,

        }
        despesas.salvarDespesa(objParams).then(response => {
                showMessage({
                    message: `Item salvo!`,
                    type: "success",
                    icon: "success",
                });
            setInitialState();
        });
    }

    const handlePressBtnCatalogo = (swipeLeft, name, type) => {
        setNameIconItemCatalogo(name);
        setTypeIconItemCatalogo(type);
        swipeLeft;
    }

    const setInitialState = () => {
        setValor('0,00');
        setSelectedIdTipoDespesa(0);
        setSelectedIdCatalogo(0);
        setSelectedIndexAno(1);
        setSelectedIndexMes(mesAtual);
        setCardIndex(0);
    }

    return (
        <Swiper
            containerStyle={styles.containerSwiper}
            ref={(swiper) => {
                refSwiper = swiper;
            }}
            cards={
                [
                    <PrimeiraEtapa
                        theme={theme}
                        valor={valor}
                        setValor={setValor}
                        swipeLeft={() => refSwiper.swipeLeft()}
                        teste={cardIndex}
                        isFocused={useIsFocused()}
                    />,
                    <SegundaEtapa
                        theme={theme}
                        setSelectedIdTipoDespesa={setSelectedIdTipoDespesa}
                        selectedIdTipoDespesa={selectedIdTipoDespesa}
                        selectedIdCatalogo={selectedIdCatalogo}
                        setSelectedIdCatalogo={setSelectedIdCatalogo}
                        swipeLeft={() => refSwiper.swipeLeft()}
                        handlePressBtnCatalogo={(name, type) => handlePressBtnCatalogo(refSwiper.swipeLeft(), name, type)}
                        from={'Despesas'}
                    />,
                    <TerceiraEtapa
                        idCatalogo={selectedIdCatalogo}
                        selectedIdItemCatalogo={selectedIdItemCatalogo}
                        setSelectedIdItemCatalogo={setSelectedIdItemCatalogo}
                        theme={theme}
                        swipeLeft={() => refSwiper.swipeLeft()}
                        nameIconItemCatalogo={nameIconItemCatalogo}
                        typeIconItemCatalogo={typeIconItemCatalogo}
                    />,
                    <QuartaEtapa
                        theme={theme}
                        selectedIndexAno={selectedIndexAno}
                        setSelectedIndexAno={setSelectedIndexAno}
                        selectedIndexMes={selectedIndexMes}
                        setSelectedIndexMes={setSelectedIndexMes}
                        statusDespesa={statusDespesa}
                        setStatusDespesa={setStatusDespesa}
                        handleClickBtnSalvar={() => handleClickBtnSalvar(refSwiper.swipeLeft())}
                    />
                ]
            }
            renderCard={(card) => {
                return (
                    <View style={styles.card}>
                        {card}
                    </View>
                )
            }}
            onSwiped={(cardIndex) => {

            }}
            onSwipedAll={() => {

            }}
            cardIndex={cardIndex}
            goBackToPreviousCardOnSwipeRight
            backgroundColor='#fff'
            verticalSwipe={false}
            swipeAnimationDuration={250}
            cardVerticalMargin={10}
            infinite
        >
        </Swiper>
    );
}

export default withTheme(Despesas);