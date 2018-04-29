import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    view: {
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: '#F1F1F1',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between', // vertical
        alignItems: 'center', // horizontal
    },
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
    },
    title: {
        fontSize: 28, // TODO : responsive
    }
});