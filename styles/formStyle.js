import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import { scaleWidth, scaleHeight, scaleDelta } from '../utils/scale';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({

    /** GENERAL **/
    formContainer: {
        width: width - scaleWidth(80),
    },
    /*scrollContainer: {
        paddingHorizontal: scaleWidth(40),
        paddingVertical: scaleHeight(40),
    },*/
    formItem:{
        marginHorizontal: scaleWidth(5),
        marginVertical: scaleHeight(5),
    },

    /** RADIO BUTTON **/
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        marginVertical: scaleHeight(15),
    },
    radioSelected: {
        fontSize: scaleDelta(16, .5),
        position: 'relative',
        top: scaleHeight(0),
        fontFamily: 'Editor-Bold',
        color: '#47404F',
    },
    radioUnselected: {
        backgroundColor: '#DBDAD9',
        paddingVertical: scaleWidth(2),
        paddingHorizontal: scaleHeight(10),
        fontSize: scaleDelta(11, .5),
        fontFamily: 'Editor-Bold',
        color: '#47404F',
    },

    /** TEXT INPUT **/
    inputItem: {
        backgroundColor: '#FFF',
        paddingTop: scaleHeight(8),
        paddingBottom: scaleHeight(5),
        paddingHorizontal: scaleHeight(10),
        fontSize: scaleDelta(12, .5),
        fontFamily: 'MaisonNeue-Medium',
        color: '#47404F',
    },
    placeItem: {
        fontSize: scaleDelta(16, .5),
        marginVertical: scaleHeight(15),
        fontFamily: 'Editor-Bold',
        color: '#47404F',
    },
    onChange: {
        position: 'relative',
        top: scaleHeight(-10),
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
        fontFamily: 'MaisonNeue-Demi',
        lineHeight: scaleDelta(14, .5),
    },
    question: {
        marginHorizontal: scaleWidth(5),
        fontSize: scaleDelta(12, .5),
        color: '#A6A2A0',
    }
});