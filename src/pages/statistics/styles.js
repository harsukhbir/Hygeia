import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
    statisticsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#E5E5E5',
        marginBottom: 20,
    },
    statisticsTitle: {
        fontSize: 22,
        lineHeight: 27,
        color: '#000000',
        fontWeight: 'bold',
    },
    Disable: {
        opacity: 0.4,
    },
    statisticsgraphBox: {
        borderBottomWidth: 1,
        borderColor: '#E5E5E5',
        marginBottom: 20,
        paddingBottom: 20,
    },
    statisticsgraphTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 22,
        color: '#000000',
        marginBottom: 10,
    },
    statisticsgraphContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    statisticsgraphText: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        color: '#000000',
        marginRight: 5,
    },
    statisticsgraphTextOrange: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        color: '#F3921F',
    },
    statisticsgraphchart: {
        paddingLeft: 13,
    },
    statisticsVictoryStack: {
        marginLeft: -30,
    },
    maincolorscaleStatic: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorscaleStatic: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    colorscaleblue: {
        width: 20,
        height: 20,
        backgroundColor: '#4B2785',
        borderRadius: 100,
    },
    colorscaleorange: {
        width: 20,
        height: 20,
        backgroundColor: '#E4B167',
        borderRadius: 100,
    },
    colorscaledarkorange: {
        width: 20,
        height: 20,
        backgroundColor: '#F3921F',
        borderRadius: 100,
    },
    statisticsgraphcolorTitle: {
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.4,
        color: '#000000',
        marginLeft: 5,
    },
    prevArrow: { flex: 1, alignItems: 'flex-end', paddingVertical: 20, paddingRight: 51 },
    nextArrow: { flex: 1, paddingVertical: 20, paddingLeft: 51 },
});
