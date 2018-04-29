import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        position: 'relative',
        paddingVertical: 40,
    },
    indication: {
        paddingHorizontal: 20,
        paddingVertical: 40,
        position: 'relative'
    },
    title: {
        fontSize: 22
    },
    buttonContainer: {
        flexDirection: 'column',
        position: 'absolute',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#4E4641',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexWrap: 'wrap',
        textAlign: 'center',
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 110,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    paginationItem: {
        paddingHorizontal: 10,
        marginBottom: 3
    },
    currentPagination: {
        fontSize: 22
    }
});