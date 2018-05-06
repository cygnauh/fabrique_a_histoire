import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import { scaleWidth, scaleHeight, scaleDelta } from '../utils/scale';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    formContainer: {
        width: width - scaleWidth(80),
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        flexWrap: 'wrap'
    },
    formItem:{
        marginHorizontal: scaleWidth(5),
        marginVertical: scaleHeight(5),
    },
    radioSelected: {
        fontSize: scaleDelta(16, .5),
        position: 'relative',
        top: scaleHeight(0)
    },
    radioUnselected: {
        backgroundColor: '#DBDAD9',
        paddingVertical: scaleWidth(2),
        paddingHorizontal: scaleHeight(10),
        fontSize: scaleDelta(11, .5)
    },
    inputItem: {
        backgroundColor: '#FFF',
        paddingVertical: scaleWidth(5),
        paddingHorizontal: scaleHeight(10),
        color: '#000',
        fontSize: scaleDelta(12, .5),
    },
    placeItem: {
        fontSize: scaleDelta(16, .5),
    }
});