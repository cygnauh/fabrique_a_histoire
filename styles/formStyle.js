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
        paddingVertical: scaleWidth(5),
        paddingHorizontal: scaleHeight(10),
        color: '#000',
        fontSize: scaleDelta(12, .5),
    },
    placeItem: {
        fontSize: scaleDelta(16, .5),
        marginVertical: scaleHeight(15),
        fontFamily: 'Editor-Bold',
        color: '#47404F',
    },
    question: {
        marginHorizontal: scaleWidth(5),
        fontSize: scaleDelta(12, .5),
        color: '#A6A2A0',
    }
});