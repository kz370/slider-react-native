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
        borderColor: 'black',
        borderWidth: 2,
        borderLeftWidth: 4,
        position: 'absolute',
        transform: [{ scaleX: .95 }],
    },
    rangeBar: {
        backgroundColor: 'green',
        height: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: -2,
    },
    box: {
        backgroundColor: 'black',
        alignSelf: 'center'
    },
    boxHidden: {
        width: 20,
        height: 20,
        backgroundColor: 'transparent'
    }
});

export default s;