import React from 'react';
import {StyleSheet} from 'react-native';
import { scaleWidth, scaleHeight, scaleDelta } from '../utils/scale';

export default StyleSheet.create({

    /** GENERAL **/
    formView: {
        paddingHorizontal: 0,
        paddingBottom: 0,
    },
    formContainer: {
        //width: width - scaleWidth(80),
        paddingTop: scaleHeight(20),
        paddingBottom: scaleHeight(50),
        paddingHorizontal: scaleWidth(40),
    },
    formItem:{
        marginHorizontal: scaleWidth(5),
        marginVertical: scaleHeight(5),
    },

    /** NAVIGATION **/
    partContainer: {
        position: 'absolute',
        top: scaleHeight(115),
        bottom: 0,
    },
    partTitleContainer: {
        width: scaleWidth(100),
        left: 0,
    },
    partNavigationContainer: {
        width: scaleWidth(10),
        right: 0,
    },
    partTitleItem: {
        transform: [{ rotate: '-90deg'}],
        width: scaleWidth(100),
        textAlign: 'center',
        fontFamily: 'MaisonNeue-Medium',
        fontSize: scaleDelta(12, .5),
        position: 'relative',
        left: scaleWidth(-30),
        top: scaleHeight(150),
        color: '#c9c6c5',
    },
    partNavigationItemContainer: {
        position: 'relative',
        top: scaleHeight(90),
        left: scaleWidth(-20),
    },
    partNavigationItem: {
        width: scaleWidth(20),
        textAlign: 'center',
        fontSize: scaleDelta(12, .5),
        fontFamily: 'Editor-Medium',
        color: '#47404F50',
        paddingVertical: scaleHeight(5),
    },
    partNavigationCurrentItem: {
        fontSize: scaleDelta(22, .5),
        color: '#47404F',
    },
    iconNav: {
        width: scaleWidth(20),
        height: scaleWidth(20),
        position: 'relative',
        left: scaleWidth(-20),
    },
    iconNavTop: {
        position: 'absolute',
    },
    iconNavDown: {
        position: 'relative',
        top: scaleHeight(160),
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
        fontSize: scaleDelta(10, .5),
        color: '#A6A2A0',
    },

    /** VOTE **/
    voteItem: {
        fontFamily: 'MaisonNeue-Demi',
        fontSize: scaleDelta(12, .5),
        color: '#47404F',
        marginHorizontal: scaleWidth(5),
        paddingHorizontal: scaleWidth(10),
        paddingVertical: scaleHeight(10),
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#c9c6c5',
        marginBottom: scaleHeight(15),
        alignSelf: 'flex-start',
    },
    voteUnselected: {
        backgroundColor: 'transparent',
    },
    voteSelected: {
        backgroundColor: '#c9c6c5',
        overflow:"hidden",
    },

    /** PRINT **/
    printBtnContainer: {
        paddingVertical: scaleHeight(30),
        marginBottom: scaleHeight(20),
    }
});