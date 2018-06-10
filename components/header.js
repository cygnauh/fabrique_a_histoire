import React from 'react';
import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import OnBoardingStyle from "../styles/onboardingStyle";
import {shutDown, networkUrl } from "../utils/tools";

export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAbout: false,
            isHome: false,
            isBack: true,
            isShutdown: true,
            isCross: false,
            isSkip: false,
        };
        this.leftElm = this.props.leftElm;
        this.rightElm = this.props.rightElm;
        this.centerElm = this.props.centerElm;
    }

    render() {
        let about = null, back = null, shutdown = null, cross = null, skip = null,
            alignElm: null;

        switch (this.leftElm) {
            case 'none':
                this.state.isBack = false;
                alignElm = 'flex-end';
                break;
            case 'shutdown':
                this.state.isBack = false;
                this.state.isShutdown = true;
                break;
            case 'home':
                this.state.isBack = false;
                this.state.isHome = true;
                alignElm = 'space-between';
                break;
            default:
                break;
        }
        switch (this.rightElm) {
            case 'about':
                this.state.isAbout = true;
                if (this.leftElm === 'none') {alignElm = 'flex-end'} else {alignElm = 'space-between'}
                break;
            case 'skip':
                this.state.isShutdown = false;
                this.state.isSkip = true;
                alignElm = 'space-between';
                break;
            case 'back':
                this.state.isCross = true;
                alignElm = 'space-between';
                break;
            default:
                this.state.isBack = true;
                this.state.isShutdown = false;
                alignElm = 'space-between';
                break;
        }

        /* Left element */
        if (this.state.isBack === true) {
            back =
                <TouchableOpacity onPress={ this.props.onPress }>
                    <Image style={OnBoardingStyle.iconBack} source={require('../assets/images/iconBack.png')}/>
                    <Text style={OnBoardingStyle.backText}>{'Retour'}</Text>
                </TouchableOpacity>
        } else if (this.state.isCross === true) {
            cross =
                <TouchableOpacity onPress={this.props.onPress} >
                    <Image style={OnBoardingStyle.iconCross} source={require('../assets/images/cross.png')}/>
                </TouchableOpacity>;
        }

        /* Right element */
        if (this.state.isAbout === true) {
            about =
                <TouchableOpacity onPress={this.props.goAbout}>
                    <Image style={OnBoardingStyle.iconAbout} source={require('../assets/images/about.png')}/>
                </TouchableOpacity>;
        } else if (this.state.isShutdown === true) {
            shutdown =
                <TouchableOpacity onPress={shutDown} >
                    <Image style={OnBoardingStyle.iconShut} source={require('../assets/images/shutDown.png')}/>
                </TouchableOpacity>;
        } else if (this.state.isSkip === true) {
            skip =
                <TouchableOpacity onPress={this.props.goLength}>
                    <Text style={OnBoardingStyle.skipBtn}>{'Passer'}</Text>
                </TouchableOpacity>
        }

        if (this.state.isHome === true) {
            back =
                <TouchableOpacity onPress={ this.props.goHome }>
                    <Image style={OnBoardingStyle.iconHome} source={require('../assets/images/logo/colorfulLogo.png')}/>
                    <Text style={[OnBoardingStyle.backText, OnBoardingStyle.homeText]}>{'Accueil'}</Text>
                </TouchableOpacity>
        }

        return(
            <View>
                <View style={[OnBoardingStyle.backBtn, {justifyContent: alignElm}]}>
                    {back}{shutdown}
                    {about}{cross}{skip}
                </View>
            </View>
        );
    }
}