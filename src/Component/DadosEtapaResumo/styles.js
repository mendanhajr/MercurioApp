import {StyleSheet} from "react-native";
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center'
    },
    containerDadosDespesa: {
        display: "flex",
        flexDirection: 'row',
        width: '100%',
        marginTop: 13,
    },
    itemDadosDespesa: {
        flexGrow: 1,
        paddingLeft: 30,
        paddingRight: 30,
    }
})

export default styles;