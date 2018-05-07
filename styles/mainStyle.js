import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight, scaleDelta } from '../utils/scale';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({

    /** GENERAL **/
    view: {
        backgroundColor: '#F1F1F1',
        paddingHorizontal: scaleWidth(40),
        paddingVertical: scaleHeight(40),
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between', // vertical
        alignItems: 'center', // horizontal
    },

    /** HEADER **/
    headerView: {
        paddingTop: scaleHeight(25),
        paddingBottom: scaleHeight(40),
    },
    logo: {
        width: scaleWidth(25),
        height: scaleWidth(25),
        alignSelf: 'center',
    },

    /** HOME **/
    titleHeader: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    titleContainer: {
        marginBottom: scaleHeight(25),
    },
    title: {
        fontSize: scaleDelta(24, 1),
        fontFamily: 'Editor-Bold',
        color: '#47404F',
    },
    subtitle: {
        fontSize: scaleDelta(18, .5),
        fontFamily: 'Editor-Bold',
        color: '#47404F',
    },
    line: {
        borderBottomColor: '#4F4640',
        borderBottomWidth: 2,
        width: width - scaleWidth(80),
    },
    text: {
        fontSize: scaleDelta(12, .5),
        lineHeight: scaleDelta(20, .5),
        color: '#47404F',
    },
    homeText: {
        marginHorizontal: scaleWidth(40),
        textAlign: 'center'
    },

    /** SUB PAGE **/
    titleContent: {
        fontSize: scaleDelta(22, .5),
        marginBottom: scaleHeight(25),
        textAlign: 'center',
        fontFamily: 'Editor-Bold',
        color: '#47404F',
    },

    /** LENGTH **/
    lengthSlider: {
        width: width - scaleWidth(80),

    },
    lengthContainer : {
        marginTop: scaleHeight(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    lengthItem: {
        fontSize: scaleDelta(12, .5),
        fontFamily: 'Editor-Medium',
        color: '#47404F50',
    },
    currentLength: {
        fontSize: scaleDelta(18, .5),
        position: 'relative',
        top: scaleWidth(-2),
        color: '#47404F',
    }
});