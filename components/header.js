import React from 'react';
import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import Logo from '../components/logo';
import OnBoardingStyle from "../styles/onboardingStyle";
import { networkUrl } from "../utils/tools";

export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAbout: false,
            isHome: false,
            isBack: true,
            isShutdown: true,
            isCross: false,
        };
        this.leftElm = this.props.leftElm;
        this.rightElm = this.props.rightElm;
        this.centerElm = this.props.centerElm;
    }

    shutDown() {
        Alert.alert('Attention', 'Voulez-vous vraiment éteindre la machine ?',
            [
                {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Éteindre', onPress: () => fetch(networkUrl, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            action: 'shutdown',
                        })
                    }).then(function (response) {
                        console.log(response);
                        return response;
                    }).catch(function (error) {
                        return error;
                    })
                },
            ],
            { cancelable: false } // unable dismiss by tapping outside of the alert box
        );
    }

    render() {
        let about = null, back = null, shutdown = null, cross = null,
            alignElm: null, logo = <Logo/>;

        switch (this.leftElm) {
            case 'about': this.state.isAbout = true; break;
            case 'shutdown':
                this.state.isBack = false;
                this.state.isShutdown = true;
                break;
            default:
                this.state.isAbout = false;
                break;
        }
        switch (this.rightElm) {
            case 'none':
                this.state.isBack = false;
                alignElm = 'flex-end';
                break;
            case 'home':
                this.state.isBack = false;
                this.state.isHome = true;
                alignElm = 'space-between';
                break;
            case 'skip':
                this.state.isShutdown = false;
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
        switch (this.centerElm) {
            case 'none': logo = null; break;
            default: break;
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

        /* Center element */
        if (this.state.isHome === true) {
            back =
                <TouchableOpacity onPress={ this.props.goHome }>
                    <Image style={OnBoardingStyle.iconHome} source={require('../assets/images/colorfulLogo.png')}/>
                    <Text style={[OnBoardingStyle.backText, OnBoardingStyle.homeText]}>{'Accueil'}</Text>
                </TouchableOpacity>
        }

        /* Right element */
        if (this.state.isAbout === true) {
            about =
                <TouchableOpacity onPress={this.props.goAbout} >
                    <Image style={OnBoardingStyle.iconAbout} source={require('../assets/images/about.png')}/>
                </TouchableOpacity>;
        } else if (this.state.isShutdown === true) {
            shutdown =
                <TouchableOpacity onPress={this.shutDown} >
                    <Image style={OnBoardingStyle.iconShut} source={require('../assets/images/shutDown.png')}/>
                </TouchableOpacity>;
        }

        return(
            <View>
                <View style={[OnBoardingStyle.backBtn, {justifyContent: alignElm}]}>
                    {back}{shutdown}
                    {about}{cross}
                </View>
                {logo}
            </View>
        );
    }
}