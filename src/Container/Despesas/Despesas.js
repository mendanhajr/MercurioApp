import React, { useState } from 'react';
import {withTheme} from 'react-native-elements';
import {View} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import PrimeiraEtapa from "../../Component/PrimeiraEtapa/PrimeiraEtapa";
import SegundaEtapa from "../../Component/SegundaEtapa/SegundaEtapa";
import TerceiraEtapa from "../../Component/TerceiraEtapa/TerceiraEtapa";
import QuartaEtapa from "../../Component/QuartaEtapa/QuartaEtapa";
import QuintaEtapa from "../../Component/QuintaEtapa/QuintaEtapa";
import * as despesas from './../../services/despesas';
import { arrayAnos } from '../../utils/utils';
const mesAtual = new Date().getMonth();
import styles from './styles';
import {showMessage} from "react-native-flash-message";
import { useIsFocused } from '@react-navigation/native';


function Despesas(props) {
    //valor da despesa
    const [valor, setValor] = useState('0,00');
    //state para o id do tipo de despesa
    const [selectedIdTipoDespesa, setSelectedIdTipoDespesa] = useState(0);
    //state para o id do catalogo;
    const [selectedIdCatalogo, setSelectedIdCatalogo] = useState(0);
    //state para o id do item de catalogo;
    const [selectedIdItemCatalogo, setSelectedIdItemCatalogo] = useState(0);
    //state para o nome do icone de item de catalogo
    const [nameIconItemCatalogo, setNameIconItemCatalogo] = useState('');
    //state para o tipo do icone de item de catalogo
    const [typeIconItemCatalogo, setTypeIconItemCatalogo] = useState('');
    //state para o ano da despesa
    const [selectedIndexAno, setSelectedIndexAno] = useState(1);
    //state para o mes da despesa
    const [selectedIndexMes, setSelectedIndexMes] = useState(mesAtual);
    //state para o status da despesa
    const [statusDespesa, setStatusDespesa] = useState(true);

    const [disableRightSwipe, setDisableRightSwipe] = useState(false);

    const [disableLeftSwipe, setDisableLeftSwipe] = useState(false);

    //STATES PARA EXIBIR DADOS NA ETAPA DE RESUMO
    const [nomeItemCatalogo, setNomeItemCatalogo] = useState('');

    const [nomeCatalogo, setNomeCatalogo] = useState('');

    const {theme} = props;
    let refSwiper = null;

    const handleClickBtnSalvar = (swipeLeft) => {
        let vl_despesa = valor.replace('.', ''),
            vl_despesa_formatado1 = vl_despesa.replace(',', '.'),
            vl_despesa_formatado2 = vl_despesa_formatado1.replace('R$', '');

        let objParams = {
            valor: vl_despesa_formatado2,
            item_catalogo_id: selectedIdItemCatalogo,
            status: statusDespesa ? 'P' : 'A',
            mes_referencia: selectedIndexMes + 1,
            ano_referencia: arrayAnos()[selectedIndexAno],

        }
        despesas.salvarDespesa(objParams).then(() => {
            showMessage({
                message: `O registro de despesa foi salvo!`,
                type: "success",
                icon: "success",
            });
            setInitialState();
            swipeLeft;
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
                        isFocused={useIsFocused()}
                    />,
                    <SegundaEtapa
                        theme={theme}
                        setSelectedIdTipoDespesa={setSelectedIdTipoDespesa}
                        selectedIdTipoDespesa={selectedIdTipoDespesa}
                        selectedIdCatalogo={selectedIdCatalogo}
                        setSelectedIdCatalogo={setSelectedIdCatalogo}
                        setNomeCatalogo={setNomeCatalogo}
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
                        swipeRight={() => refSwiper.swipeRight()}
                        nameIconItemCatalogo={nameIconItemCatalogo}
                        typeIconItemCatalogo={typeIconItemCatalogo}
                        setNomeItemCatalogo={setNomeItemCatalogo}
                    />,
                    <QuartaEtapa
                        theme={theme}
                        selectedIndexAno={selectedIndexAno}
                        setSelectedIndexAno={setSelectedIndexAno}
                        selectedIndexMes={selectedIndexMes}
                        setSelectedIndexMes={setSelectedIndexMes}
                        statusDespesa={statusDespesa}
                        setStatusDespesa={setStatusDespesa}
                        swipeLeft={() => refSwiper.swipeLeft()}
                    />,
                    <QuintaEtapa
                        handleClickBtnSalvar={() => handleClickBtnSalvar(refSwiper.swipeLeft())}
                        nameIconItemCatalogo={nameIconItemCatalogo}
                        typeIconItemCatalogo={typeIconItemCatalogo}
                        nomeCatalogo={nomeCatalogo}
                        nomeItemCatalogo={nomeItemCatalogo}
                        selectedIdTipoDespesa={selectedIdTipoDespesa}
                        statusDespesa={statusDespesa}
                        selectedIndexMes={selectedIndexMes}
                        selectedIndexAno={selectedIndexAno}
                        valor={valor}
                        theme={theme}
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
            cardIndex={0}
            goBackToPreviousCardOnSwipeRight
            backgroundColor='#fff'
            verticalSwipe={false}
            swipeAnimationDuration={250}
            cardVerticalMargin={10}
            infinite
            dragStart={()=> {
                //caso seja Primeira etapa bloqueia o swiperLeft
                if(refSwiper.state.secondCardIndex === 1){
                    setDisableRightSwipe(true);
                }else{
                    setDisableRightSwipe(false);
                }
                //caso seja Quarta etapa ou Quinta etapa bloqueia o swiperLeft
                if(refSwiper.state.secondCardIndex === 4 || refSwiper.state.secondCardIndex === 0){
                    setDisableLeftSwipe(true);
                }else{
                    setDisableLeftSwipe(false);
                }
            }}
            disableLeftSwipe={disableLeftSwipe}
            disableRightSwipe={disableRightSwipe}
        >
        </Swiper>
    );
}

export default withTheme(Despesas);