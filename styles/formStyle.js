import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import { scaleWidth, scaleHeight, scaleDelta } from '../utils/scale';

const { width, height } = Dimensions.get('window');

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
        color: '#300365',
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
        marginHorizontal: scaleWidth(5),
    },
    radioSelected: {
        fontSize: scaleDelta(16, .5),
        position: 'relative',
        top: scaleHeight(0),
        fontFamily: 'Editor-Bold',
        color: '#300365',
        borderWidth: 2,
        borderColor:'#c0b5cd',
        paddingHorizontal: scaleWidth(10),
        paddingVertical: scaleWidth(4),
        borderRadius: scaleWidth(12),
    },
    radioUnselected: {
        paddingVertical: scaleWidth(2),
        paddingHorizontal: scaleHeight(10),
        marginBottom: scaleHeight(10),
        fontSize: scaleDelta(11, .5),
        fontFamily: 'Editor-Bold',
        color: '#300365',
    },
    radioBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioBtnChange: {
        width: scaleWidth(14), // 78
        height: scaleWidth(8), // 45
        position: 'relative',
        left: scaleWidth(-25)
    },
    itemChange: {
        paddingRight: scaleWidth(30)
    },
    radioBtnLine: {
        backgroundColor: '#c0b5cd',
        height: scaleHeight(20),
        width: 2
    },

    /** TEXT INPUT **/
    inputItem: {
        paddingTop: scaleHeight(8),
        paddingBottom: scaleHeight(8),
        paddingHorizontal: scaleHeight(5),
        fontSize: scaleDelta(12, .5),
        fontFamily: 'MaisonNeue-Medium',
        color: '#47404F',
        borderBottomWidth: 2,
        borderColor: '#c9c6c5',
    },
    textItem: {
        fontSize: scaleDelta(16, .5),
        fontFamily: 'Editor-Bold',
        color: '#300365',
    },
    startItem: {
        marginTop: scaleHeight(20),
    },
    endItem: {
        marginTop: scaleHeight(10),
        marginBottom: scaleHeight(20),
    },

    /** UNDERLINE INPUT **/
    underlineInputItem: {
        borderBottomWidth: 2,
        width: width - scaleWidth(80),
        paddingBottom: scaleHeight(5),
        paddingLeft: scaleWidth(5),
        marginBottom: scaleHeight(10),
    },
    textInput : {
        paddingTop: scaleHeight(10),
        fontFamily: 'MaisonNeue-Demi',
        fontSize: scaleDelta(12, .5),
        lineHeight: scaleDelta(14, .5),
        color: '#47404F',
    },


    /** VOTE **/
    voteItem: {
        alignSelf: 'flex-start',
        marginHorizontal: scaleWidth(5),
        marginBottom: scaleHeight(15),
        paddingHorizontal: scaleWidth(10),
        paddingVertical: scaleHeight(10),
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#c9c6c5',
        fontFamily: 'MaisonNeue-Demi',
        fontSize: scaleDelta(12, .5),
        color: '#47404F',
    },
    imposedEvent: {
        marginTop: scaleHeight(20),
        marginBottom: scaleHeight(15),
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