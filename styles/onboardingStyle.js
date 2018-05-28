import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import { scaleWidth, scaleHeight, scaleDelta } from '../utils/scale';
import {colors} from "./colors";

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
        justifyContent: 'space-between',
    },
    backText: {
        position: 'relative',
        top: -scaleHeight(12),
        left: scaleWidth(15),
        fontFamily: 'MaisonNeue-Bold',
        color: colors.greyishBrown,
        fontSize: scaleDelta(12, .5),
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
        color: colors.indigo,
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
        width: scaleWidth(90),
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: colors.greyishBrown,
        paddingLeft: scaleWidth(15),
        paddingRight: scaleWidth(10),
        marginHorizontal: scaleWidth(5),
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
        borderBottomColor: '#c9c6c5',
        borderBottomWidth: 2,
        width: width - scaleWidth(160), // subtract margin + btn width
    },

    /**  SKIP **/
    skipBtn: {
        position: 'absolute',
        top: -scaleHeight(100),
        right: 0,
        marginRight: scaleWidth(20),
        fontFamily: 'MaisonNeue-Bold',
        color: colors.greyishBrown,
        fontSize: scaleDelta(12, .5),
    },

    /** PAGINATION **/
    paginationContainer: {
        position: 'absolute',
        bottom: scaleWidth(30), // 40 after delete skip btn
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    paginationItem: {
        paddingHorizontal: scaleWidth(8),
        fontSize: scaleDelta(12, .5),
        fontFamily: 'Editor-Medium',
        color: colors.pinkishGreyTwo,
    },
    currentPagination: {
        fontSize: scaleDelta(22, .5),
        position: 'relative',
        top: scaleWidth(4),
        color: colors.indigo,
    }
});