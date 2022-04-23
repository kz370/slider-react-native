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
    },
    bar: {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: 'red',
        borderRadius: 20,
        height: 20
    },
    rangeBar: {
        backgroundColor: 'green',
        borderRadius: 20,
        height: 20
    },
    box: {
        height: 20,
        width: 20,
        borderRadius: 50,
        backgroundColor:'black'
    },
});

export default s;