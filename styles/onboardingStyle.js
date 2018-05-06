import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import { scaleWidth, scaleHeight, scaleDelta } from '../utils/scale';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({

    fullScreen: {
        width: width,
        height: height,
    },
    container: {
        backgroundColor: '#F1F1F1',
        position: 'relative',
        paddingTop: scaleHeight(25),
        paddingBottom: scaleHeight(40),
    },
    backBtn: {
        paddingHorizontal: scaleWidth(20),
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    /** INDICATIONS **/
    indication: {
        position: 'absolute',
        top: 0, bottom: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: scaleWidth(40),
        marginTop: scaleHeight(80), // do not hide back btn
    },
    title: {
        fontSize: scaleDelta(22, .5),
        marginBottom: scaleWidth(50)
    },

    /** BUTTON **/
    buttonContainer: {
        position: 'absolute',
        top: scaleHeight(60),
        bottom: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: scaleWidth(40),
    },
    button: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#4E4641',
        paddingVertical: scaleHeight(4),
        paddingHorizontal: scaleWidth(15),
        flexWrap: 'wrap',
        textAlign: 'center',
        fontSize: scaleDelta(12, .5),
    },
    line: {
        position: 'relative',
        top: scaleHeight(15),
        borderBottomColor: '#4E4641',
        borderBottomWidth: 2,
        width: width - scaleWidth(80), // subtract margin
    },

    /** PAGINATION **/
    paginationContainer: {
        position: 'absolute',
        bottom: scaleWidth(40),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    paginationItem: {
        paddingHorizontal: scaleWidth(8),
        fontSize: scaleDelta(12, .5)
    },
    currentPagination: {
        fontSize: scaleDelta(20, .5),
        position: 'relative',
        top: scaleWidth(3)
    }
});