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
        width: width,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    iconBack: {
        height: scaleWidth(10),
        width: scaleWidth(10),
    },

    /** INDICATIONS **/
    indication: {
        position: 'absolute',
        top: 0, bottom: 0,
        flexDirection: 'column',
        justifyContent: 'flex-start', // update when add img
        paddingHorizontal: scaleWidth(40),
        marginTop: scaleHeight(230), // 80 : do not hide back btn
    },
    title: {
        fontSize: scaleDelta(24, .5),
        marginBottom: scaleWidth(30),
        fontFamily: 'Editor-Bold',
        color: '#47404F',
        textAlign: 'center',
    },
    text: {
        marginHorizontal: scaleWidth(40),
        fontFamily: 'MaisonNeue-Medium',
        paddingBottom: scaleHeight(50),
    },

    /** BUTTON **/
    buttonContainer: {
        position: 'absolute',
        top: scaleHeight(65),
        bottom: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(40),
    },
    buttonItem: {
        alignSelf: 'center', // self width
        width: scaleWidth(80),
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#4F4640',
        paddingLeft: scaleWidth(15),
        paddingRight: scaleWidth(10),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        flexWrap: 'wrap',
        textAlign: 'center',
        fontSize: scaleDelta(12, .5),
        color: '#47404F',
        fontFamily: 'MaisonNeue-Medium',
    },
    buttonImg: {
        width: scaleWidth(18),
        height: scaleWidth(18),
    },
    line: {
        position: 'relative',
        top: scaleHeight(-110),
        borderBottomColor: '#4F4640',
        borderBottomWidth: 2,
        width: width - scaleWidth(160), // subtract margin + btn width
    },

    /**  SKIP **/
    skipBtn: {
        marginLeft: scaleWidth(40),
        marginBottom: scaleHeight(10),
        fontFamily: 'MaisonNeue-Bold',
        color: '#47404F',
        fontSize: scaleDelta(12, .5),
    },

    /** PAGINATION **/
    paginationContainer: {
        position: 'absolute',
        bottom: scaleWidth(40),
        right: scaleWidth(40),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    paginationItem: {
        paddingHorizontal: scaleWidth(8),
        fontSize: scaleDelta(12, .5),
        fontFamily: 'Editor-Medium',
        color: '#47404F50',
    },
    currentPagination: {
        fontSize: scaleDelta(22, .5),
        position: 'relative',
        top: scaleWidth(4),
        color: '#47404F',
    }
});