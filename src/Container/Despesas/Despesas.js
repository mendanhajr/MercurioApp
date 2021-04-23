import React, {useState} from 'react';
import {withTheme} from 'react-native-elements';
import {View} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import PrimeiraEtapa from "../../Component/PrimeiraEtapa/PrimeiraEtapa";
import SegundaEtapa from "../../Component/SegundaEtapa/SegundaEtapa";
import TerceiraEtapa from "../../Component/TerceiraEtapa/TerceiraEtapa";
import * as despesas from './../../services/despesas';
const mesAtual = new Date().getMonth();
import styles from './styles';
import {showMessage} from "react-native-flash-message";

function Despesas(props) {
    //valor da despesa
    const [valor, setValor] = useState('0,00');
    //state para o id do tipo de despesa selecionado (FIXA) default;
    const [selectedIdTipoDespesa, setSelectedIdTipoDespesa] = useState(0);
    //state para o id do tipo de despesa selecionado (FIXA) default;
    const [selectedIdCatalogo, setSelectedIdCatalogo] = useState(0);
    //state para o ano da despesa
    const [selectedIndexAno, setSelectedIndexAno] = useState(1);
    //state para controlar o mes da despesa
    const [selectedIndexMes, setSelectedIndexMes] = useState(mesAtual);
    //state para erros de requisicao
    const [anyErrorRequest, setAnyErrorRequest] = useState(false);

    const [cardIndex, setCardIndex] = useState(0);

    const {theme} = props;
    let refSwiper = null;

    const handleClickBtnSalvar = (swipeLeft) => {
        let vl_despesa = valor.replace('.', ''),
            vl_despesa_formatado1 = vl_despesa.replace(',', '.'),
            vl_despesa_formatado2 = vl_despesa_formatado1.replace('R$', '');

        let objParams = {
            valor: vl_despesa_formatado2,
            catalogo_id : selectedIdCatalogo,
            status: 'P',
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
                    />,
                    <SegundaEtapa
                        theme={theme}
                        setSelectedIdTipoDespesa={setSelectedIdTipoDespesa}
                        selectedIdTipoDespesa={selectedIdTipoDespesa}
                        selectedIdCatalogo={selectedIdCatalogo}
                        setSelectedIdCatalogo={setSelectedIdCatalogo}
                        anyErrorRequest={anyErrorRequest}
                        setAnyErrorRequest={setAnyErrorRequest}
                        swipeLeft={() => refSwiper.swipeLeft()}
                    />,
                    <TerceiraEtapa
                        theme={theme}
                        selectedIndexAno={selectedIndexAno}
                        setSelectedIndexAno={setSelectedIndexAno}
                        selectedIndexMes={selectedIndexMes}
                        setSelectedIndexMes={setSelectedIndexMes}
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