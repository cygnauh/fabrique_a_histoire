import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        flexWrap: 'wrap'
    },
    radioItem:{
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
    }
});