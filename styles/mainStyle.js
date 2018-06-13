import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight, scaleDelta } from '../utils/scale';
import {colors} from "./colors";
const { width, height } = Dimensions.get('window');
const resizeMode = 'repeat';

export default StyleSheet.create({

    /** GENERAL **/
    view: {
        backgroundColor: colors.bgColor,
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
        width: scaleWidth(30 * 95 / 123), // original : 95 * 123
        height: scaleWidth(30),
        alignSelf: 'center',
        marginBottom: -scaleHeight(50),
    },

    /** HOME **/
    titleHeader: {
      flexDirection: 'column',
      alignItems: 'flex-start'

    },
    titleContainer: {
        marginBottom: scaleHeight(25),
        top:-scaleHeight(70),
        width:width-scaleWidth(180),
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'

    },
    title: {
        paddingTop:scaleHeight(70),
        paddingBottom:scaleHeight(20),
        fontSize: scaleDelta(20, .5),
        fontFamily: 'Editor-Bold',
        color: colors.indigo,
        textAlign:'center'
    },
    subtitle: {
        fontSize: scaleDelta(28, .5),
        fontFamily: 'Editor-Bold',
        color: colors.indigo,
    },
    line: {
        borderBottomColor: colors.pinkishGreyTwo,
        borderBottomWidth: 2,
        width: width - scaleWidth(180),
        top:-scaleHeight(75)
    },
    text: {
        fontSize: scaleDelta(12, .5),
        lineHeight: scaleDelta(20, .5),
        fontFamily: 'MaisonNeue-Medium',
        color: colors.greyishBrown,
        textAlign: 'center'

    },
    homeText: {
        marginHorizontal: scaleWidth(40),
        textAlign: 'center',
        top:-scaleHeight(160)
    },
    homeBtn: {
        fontSize: scaleDelta(12, .5),
        fontFamily: 'MaisonNeue-Medium',
        color: colors.greyishBrown,
        paddingTop: scaleHeight(8),
        paddingBottom: scaleHeight(6),
        paddingHorizontal: scaleWidth(15),
        borderWidth: 2,
        borderColor: colors.greyishBrown
    },

    homeCodeContainer: {
        top:-scaleHeight(170)
    },

    imageTitle:{

        width: (80*968)/200,
        height: 80
    },
    textBtnScan:{
        textAlign: 'center',
        fontSize:scaleDelta(11, .5),
        top:-scaleHeight(18)
    },

    /** SUB PAGE **/
    titleContent: {
        fontSize: scaleDelta(22, .5),
        marginBottom: scaleHeight(25),
        marginTop: scaleHeight(25),
        textAlign: 'center',
        fontFamily: 'Editor-Bold',
        color: colors.indigo,
    },

    /** LENGTH **/
    lengthSliderContainer: {
        flexDirection: 'row'
    },
    lengthSlider: {
        width: width - scaleWidth(120),
    },
    manageLength: {
        fontSize: scaleDelta(20, .5),
        fontFamily: 'MaisonNeue-Light',
        position: 'relative',
        top: scaleHeight(3),
        paddingHorizontal: scaleWidth(8)
    },
    lengthContainer : {
        marginTop: scaleHeight(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    lengthItem: {
        fontSize: scaleDelta(12, .5),
        fontFamily: 'Editor-Medium',
        color: colors.pinkishGreyTwo,
    },
    currentLength: {
        fontSize: scaleDelta(18, .5),
        position: 'relative',
        top: scaleWidth(-2),
        color: colors.greyishBrown,
    },

    iconLength:{
        height: scaleWidth(10), width: scaleWidth(10),
    },

    lengthIndication:{
        width:75,
        paddingTop:5,
        paddingLeft:10,
        textAlign:"right",
        fontSize:scaleDelta(10, .5)
    },

    /** PLACE **/
    placePhrase: {
        position:'relative',
        top:scaleHeight(-50),
        fontFamily: 'Editor-Medium',
        textAlign:'center',
        color: colors.white,
        fontSize: scaleDelta(16, .5),
    },
    placeContainer:{
        minHeight:350,
        position:'absolute',
        left:0,
        right:0,
        paddingTop:10
    },
    placeTitle: {
        textAlign:'center',
        color: colors.white,
        fontFamily: 'Editor-Medium',
        fontSize: scaleDelta(42, .5),
    },

    /** RE-READING **/
    reReadingBtnContainer: {
        flexDirection: 'row',
    },
    storyTitle: {
        marginBottom: scaleHeight(25),
    },
    storyText: {
        textAlign: 'left',
        marginBottom: scaleHeight(15),
    },

    /** PRINT **/
    printTitle: {
        textAlign: 'center',
        marginHorizontal: scaleWidth(60),
    },
    printQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nbCopies: {
        fontSize: scaleDelta(28, .5),
        color: colors.greyishBrown,
        fontFamily: 'Editor-Bold',
        paddingHorizontal: scaleWidth(20),
    },
    manageQuantity: {
        fontSize: scaleDelta(24, .5),
        fontFamily: 'MaisonNeue-Light',
        position: 'relative',
        top: scaleHeight(2)
    },
    quantityBackground: {
        width: scaleWidth(20),
        height: scaleWidth(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.pinkishGreyTwo,
        borderRadius: scaleWidth(20),
    },

    /** ABOUT **/
    aboutPageContainer: {
        position: 'relative',
        backgroundColor: colors.bgColor,
    },
    aboutContainer: {
        backgroundColor: 'transparent',
        paddingHorizontal: scaleWidth(20),
        position: 'relative',
        bottom: -scaleHeight(20),
    },
    titleAbout: {
        marginTop: scaleHeight(10),
        paddingTop: scaleHeight(20),
        marginBottom: scaleHeight(20),
        fontSize: scaleDelta(20, .5),
    },
    aboutText: {
        textAlign: 'left',
        marginBottom: scaleHeight(10)
    },
    aboutAuthor: {
        marginTop: scaleHeight(20),
        marginBottom: scaleHeight(20),
    },
    logoAbout: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: scaleHeight(40),
    },

    /** CONNECTION **/
    connectContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: scaleHeight(40),
    },
    connectIndication: {
        height: scaleWidth(6),
        width: scaleWidth(6),
        borderRadius: scaleWidth(6),
        marginRight: scaleWidth(5),
        position: 'relative',
        top: scaleHeight(2),
    },
    errorIndication: {
        height: scaleWidth(8),
        width: scaleWidth(8),
        marginRight: scaleWidth(5),
        position: 'relative',
    },
    connectText: {
        fontSize: scaleDelta(10, .5),
        position: 'relative'
    },

    /** SETTINGS **/
    settingsContainer: {
        backgroundColor: colors.bgColor,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: height - scaleHeight(50),
    },
    settingBtnContainer: {
        borderWidth: 2,
        borderColor: colors.heather,
        paddingHorizontal: scaleWidth(10),
        paddingVertical: scaleWidth(4),
        borderRadius: scaleWidth(12),
        marginTop: scaleHeight(20),
    },
    settingBtn: {
        paddingVertical: scaleWidth(2),
        paddingHorizontal: scaleHeight(10),
        fontSize: scaleDelta(11, .5),
        fontFamily: 'Editor-Bold',
        color: colors.indigo,
        textAlign: 'center',
    },
    networkContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    networkTitle: {
        marginTop: scaleHeight(30),
        marginBottom: scaleHeight(20),
    }
});