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
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'grey',
    },
    rangeBar: {
        backgroundColor: 'green',
    },
});

export default s;