export function arrayDatas(){
    return [
        'JANEIRO',
        'FEVEREIRO',
        'MARÇO',
        'ABRIL',
        'MAIO',
        'JUNHO',
        'JULHO',
        'AGOSTO',
        'SETEMBRO',
        'OUTUBRO',
        'NOVEMBRO',
        'DEZEMBRO',
    ]
}

/**
 *Array de anos disponíveis no app
 * @returns {(number|number)[]}
 */
export function arrayAnos() {
    const anoAtual = new Date().getFullYear();
    return [
        anoAtual - 1,
        anoAtual,
        anoAtual + 1
    ]
}

export function getObjIcon(iconName){
    switch (iconName){
        case "Casa":
            return {name: 'home', type: 'font-awesome'};
            break;
        case 'Mercado':
            return {name: 'shopping-basket', type: 'font-awesome'};
            case 'Compras':
            return {name: 'shopping-cart', type: 'font-awesome'};
            case 'Boletos':
            return {name: 'barcode', type: 'font-awesome'};
            case 'Gasolina':
            return {name: 'gas-pump', type: 'font-awesome-5'};
            break;
            case 'Investimentos':
            return {name: 'chart-line', type: 'font-awesome-5'};
            case 'Lanches':
            return {name: 'utensils', type: 'font-awesome-5'};
            break;
            case 'Serviços':
            return {name: 'tools', type: 'font-awesome-5'};
            break;
            case 'Carro':
            return {name: 'car', type: 'font-awesome-5'};
            break;
            case 'Medicamentos':
            return {name: 'hospital', type: 'font-awesome-5'};
            break;
            case 'Transporte':
            return {name: 'bus-alt', type: 'font-awesome-5'};
            break;
            case 'Viagem':
            return {name: 'umbrella-beach', type: 'font-awesome-5'};
            break;
            case 'Entretenimento':
            return {name: 'gamepad', type: 'font-awesome-5'};
            break;
            case 'Roupas':
            return {name: 'tshirt', type: 'font-awesome-5'};
            break;
        default: return {name: 'exclamation', type: 'font-awesome'}
    }
}