import React from 'react';
import { StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight, scaleDelta } from '../utils/scale';

export default StyleSheet.create({
    view: {
        backgroundColor: '#F1F1F1',
        paddingHorizontal: scaleWidth(40),
        paddingVertical: scaleHeight(40),
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between', // vertical
        alignItems: 'center', // horizontal
    },
    logo: {
        width: scaleWidth(25),
        height: scaleWidth(25),
        alignSelf: 'center',
    },
    title: {
        fontSize: scaleDelta(24, 1),
    },
    subtitle: {
        fontSize: scaleDelta(18, .5),
    },
    text: {
        fontSize: scaleDelta(12, .5),
        lineHeight: scaleDelta(20, .5)
    },
    homeText: {
        marginHorizontal: scaleWidth(50),
        textAlign: 'center'
    }
});