import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        flexWrap: 'wrap'
    },
    formItem:{
        marginHorizontal: 5,
        marginVertical: 5
    },
    radioSelected: {
        fontSize: 18
    },
    radioUnselected: {
        backgroundColor: '#DBDAD9',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    inputItem: {
        backgroundColor: '#FFF',
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: '#000'
    }
});