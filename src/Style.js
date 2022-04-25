import { StyleSheet } from 'react-native';

const s = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 20
    },
    rangeBar: {
        backgroundColor: 'green',
        height: 20,
        borderRadius: 20,
    },
    box: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: 'black',
        // alignSelf:'flex-start'
    },
    boxHidden: {
        width: 20,
        height: 20,
        backgroundColor:'transparent'
    }
});

export default s;